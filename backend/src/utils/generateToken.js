import jwt from "jsonwebtoken";
import RefreshToken from "../models/tokenModel.js";

const generateTokenAndSetCookie = async (userId, res) => {
    const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ userId }, process.env.REFRESH_SECRET, {
        expiresIn: "7d",
    });

    // Store refresh token in DB
    await RefreshToken.create({
        token: refreshToken,
        userId,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    // Set cookies
    res.cookie("jwt", accessToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return { accessToken, refreshToken };
};

export default generateTokenAndSetCookie;
