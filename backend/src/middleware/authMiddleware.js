import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import RefreshToken from "../models/tokenModel.js";

export const protect = async (req, res, next) => {
    try {
        const accessToken = req.cookies.jwt;

        if (!accessToken) {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(401).json({ error: "No tokens provided" });
            }

            const payload = jwt.verify(
                refreshToken,
                process.env.REFRESH_SECRET
            );
            const stored = await RefreshToken.findOne({ token: refreshToken });

            if (!stored) {
                return res.status(403).json({ error: "Invalid refresh token" });
            }

            const newAccessToken = jwt.sign(
                { userId: payload.userId },
                process.env.JWT_SECRET,
                {
                    expiresIn: "15m",
                }
            );

            res.cookie("jwt", newAccessToken, {
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV !== "development",
                maxAge: 15 * 60 * 1000,
            });

            req.user = await User.findById(payload.userId).select("-password");
            return next();
        }

        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ error: "Not authorized" });
    }
};
