import express from "express";
import {
    login,
    logout,
    register,
    setRefreshToken,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/login", login);

router.post("/register", register);

router.post("/logout", logout);

router.post("/refresh-token", setRefreshToken);

export default router;
