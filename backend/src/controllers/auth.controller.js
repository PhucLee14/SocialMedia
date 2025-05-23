import RefreshToken from "../models/tokenModel.js";
import User from "../models/userModel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const register = async (req, res) => {
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

const login = async (req, res) => {
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

const logout = async (req, res) => {
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

const setRefreshToken = async (req, res) => {
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

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        // Tạo token reset
        const resetToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "15m" }
        );
        // Lưu token vào DB
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 phút
        await user.save();
        // Gửi email chứa link reset
        const resetLink = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: "Password Reset Request",
            html: `
                    <h2>Reset Your Password</h2>
                    <p>Click the link below to reset your password. This link is valid for 15 minutes.</p>
                    <a href="${resetLink}">${resetLink}</a>
                `,
        });
        res.json({ message: "Reset password email sent successfully" });
    } catch (err) {
        console.error("Forgot password error:", err.message);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    console.log("req: ", req.body);

    if (!token || !newPassword) {
        return res.status(400).json({
            error: "Token and new password are required",
            token: token,
            newPassword: newPassword,
        });
    }

    try {
        // Xác thực token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({
            _id: decoded.userId,
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }, // Chưa hết hạn
        });

        if (!user) {
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        // Hash mật khẩu mới
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Cập nhật mật khẩu và xóa token reset
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.json({ message: "Password has been reset successfully" });
    } catch (err) {
        console.error("Reset password error:", err.message);
        return res.status(400).json({ error: "Invalid or expired token" });
    }
};

export {
    register,
    login,
    logout,
    setRefreshToken,
    forgotPassword,
    resetPassword,
};
