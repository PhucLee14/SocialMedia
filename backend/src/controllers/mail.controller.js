// import jwt from "jsonwebtoken";
// import nodemailer from "nodemailer";
// import User from "../models/userModel.js";

// const sendVerificationEmail = async (req, res) => {
//     const { email } = req.body;

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//             expiresIn: "1h",
//         });

//         const verificationLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

//         // Gửi email
//         const transporter = nodemailer.createTransport({
//             service: "Gmail",
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to: user.email,
//             subject: "Email Verification",
//             html: `<p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
//         });

//         res.status(200).json({ message: "Verification email sent" });
//     } catch (error) {
//         res.status(500).json({ error: "Error sending verification email" });
//     }
// };

// const verifyEmail = async (req, res) => {
//     const { token } = req.query;

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         const user = await User.findById(decoded.userId);
//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         if (user.isVerified) {
//             return res.status(400).json({ error: "Email already verified" });
//         }

//         user.isVerified = true;
//         await user.save();

//         res.status(200).json({ message: "Email verified successfully" });
//     } catch (error) {
//         res.status(400).json({ error: "Invalid or expired token" });
//     }
// };

// export { sendVerificationEmail, verifyEmail };
