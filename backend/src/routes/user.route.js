import express from "express";
import {
    editProfile,
    getUser,
    getUserByID,
    getUserByUsername,
    getUserForSidebar,
    likePost,
    savePost,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const route = express.Router();

route.get("/", protect, getUser);

route.get("/getUserForSidebar", protect, getUserForSidebar);

route.get("/:id", getUserByID);

route.get("/u/:userName", getUserByUsername);

route.patch("/account/edit/:id", editProfile);

route.put("/:userId/like", likePost);
route.put("/:userId/save", savePost);

export default route;
