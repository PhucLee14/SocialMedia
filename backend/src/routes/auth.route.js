import express from "express";
import {
    forgotPassword,
    login,
    logout,
    register,
    resetPassword,
    setRefreshToken,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/refresh-token", setRefreshToken);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
