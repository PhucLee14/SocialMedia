import passport from "passport";
import FacebookTokenStrategyModule from "passport-facebook-token";
import User from "../models/userModel.js";
const FacebookTokenStrategy = FacebookTokenStrategyModule.Strategy;
import dotenv from "dotenv";
dotenv.config();

passport.use(
    new FacebookTokenStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            authorizationURL: "https://www.facebook.com/v17.0/dialog/oauth",
            tokenURL: "https://graph.facebook.com/v17.0/oauth/access_token",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("Facebook Profile:", profile);

                // Kiểm tra user đã tồn tại với Facebook ID
                let user = await User.findOne({ facebookId: profile.id });

                if (user) {
                    return done(null, user);
                }

                // Kiểm tra user đã tồn tại với email
                const existingEmailUser = await User.findOne({
                    email: profile.emails?.[0]?.value,
                });

                if (existingEmailUser) {
                    // Link Facebook account với user hiện tại
                    existingEmailUser.facebookId = profile.id;
                    existingEmailUser.loginProvider = "facebook";
                    await existingEmailUser.save();
                    return done(null, existingEmailUser);
                }

                // Tạo userName unique từ Facebook profile
                let baseUserName =
                    profile.displayName?.replace(/\s+/g, "").toLowerCase() ||
                    "fbuser";
                let userName = baseUserName;
                let counter = 1;

                while (await User.findOne({ userName })) {
                    userName = `${baseUserName}${counter}`;
                    counter++;
                }

                // Tạo user mới
                const newUser = new User({
                    facebookId: profile.id,
                    fullName: profile.displayName || "Facebook User",
                    email:
                        profile.emails?.[0]?.value ||
                        `${profile.id}@facebook.com`,
                    userName: userName,
                    phoneNumber: "0000000000", // Default phone
                    profilePicture:
                        profile.photos?.[0]?.value ||
                        "https://i.pinimg.com/736x/a0/4d/84/a04d849cf591c2f980548b982f461401.jpg",
                    loginProvider: "facebook",
                    isVerified: true, // Facebook users are pre-verified
                });

                await newUser.save();
                done(null, newUser);
            } catch (error) {
                console.error("Facebook Strategy Error:", error);
                done(error, null);
            }
        }
    )
);

export default passport;
