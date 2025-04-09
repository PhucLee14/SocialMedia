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

        if (newUser) {
            generateTokenAndSetCookie(newUser._id, res);
            await newUser.save();

            return res.status(201).json({
                _id: newUser._id,
                userName: newUser.userName,
                email: newUser.email,
                phoneNumber: newUser.phoneNumber,
                fullName: newUser.fullName,
                password: newUser.password,
                profilePicture: newUser.profilePicture,
            });
        } else {
            return res.status(400).json({ error: "Invalid user data" });
        }
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
        if (!userName || !isMatch) {
            return res
                .status(400)
                .json({ error: "Invalid username or password" });
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            userName: user.userName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            fullName: user.fullName,
            profilePicture: user.profilePicture,
        });
    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
