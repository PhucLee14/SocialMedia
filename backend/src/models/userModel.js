import mongoose, { Schema } from "mongoose";

const userModel = Schema(
    {
        userName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default: "",
        },
        bio: {
            type: String,
            default: "",
        },
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        saves: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
        isAdmin: {
            type: Boolean,
            default: false,
        },
        isBan: {
            type: Boolean,
            default: false,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        otpCode: { type: String },
        otpExpires: { type: Date },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userModel);

export default User;
