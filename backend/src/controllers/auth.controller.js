import RefreshToken from "../models/tokenModel.js";
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const { userName, email, phoneNumber, password, fullName } = req.body;

        if (!userName || !email || !phoneNumber || !password || !fullName) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const userEmail = await User.findOne({ email });
        const userUserName = await User.findOne({ userName });

        if (userEmail) {
            return res.status(400).json({ error: "Email already exists" });
        }

        if (userUserName) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const verificationCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const defaultPic =
            "https://i.pinimg.com/736x/a0/4d/84/a04d849cf591c2f980548b982f461401.jpg";

        const newUser = new User({
            userName,
            email,
            phoneNumber,
            password: hashedPassword,
            fullName,
            profilePicture: defaultPic,
            verificationCode,
        });

        await newUser.save();

        const { accessToken, refreshToken } = await generateTokenAndSetCookie(
            newUser._id,
            res
        );

        return res.status(201).json({
            _id: newUser._id,
            userName: newUser.userName,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber,
            fullName: newUser.fullName,
            profilePicture: newUser.profilePicture,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const user = await User.findOne({ userName });
        const isMatch = await bcrypt.compare(password, user?.password || "");

        if (!user || !isMatch) {
            return res
                .status(400)
                .json({ error: "Invalid username or password" });
        }

        // Get tokens and set cookies
        const { accessToken, refreshToken } = await generateTokenAndSetCookie(
            user._id,
            res
        );

        // Respond once
        res.status(200).json({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            fullName: user.fullName,
            profilePicture: user.profilePicture,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        await RefreshToken.deleteOne({ token: refreshToken });
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const setRefreshToken = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
        return res.status(401).json({ message: "Missing token" });

    try {
        const payload = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

        const storedToken = await RefreshToken.findOne({
            token: refreshToken,
            userId: payload.userId,
        });
        if (!storedToken)
            return res.status(403).json({ message: "Invalid token" });

        if (new Date() > storedToken.expiresAt) {
            await storedToken.deleteOne();
            return res.status(403).json({ message: "Token expired" });
        }

        const newAccessToken = jwt.sign(
            { userId: payload.userId },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );

        res.cookie("jwt", newAccessToken, {
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
            maxAge: 15 * 60 * 1000,
        });

        res.json({ success: true });
    } catch (err) {
        res.status(403).json({ message: "Token verification failed" });
    }
};
