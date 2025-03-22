import express from "express";
import {
    editProfile,
    getUser,
    getUserByID,
    getUserByUsername,
    getUserForSidebar,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const route = express.Router();

route.get("/", protect, getUser);

route.get("/:id", getUserByID);

route.get("/u/:userName", getUserByUsername);

route.patch("/account/edit/:id", editProfile);

route.get("/aaaa", protect, getUserForSidebar);

export default route;
