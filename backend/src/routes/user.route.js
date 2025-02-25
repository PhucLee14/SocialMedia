import express from "express";
import {
    getUser,
    getUserByID,
    getUserByUsername,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const route = express.Router();

route.get("/", protect, getUser);

route.get("/:id", getUserByID);

route.get("/u/:userName", getUserByUsername);

export default route;
