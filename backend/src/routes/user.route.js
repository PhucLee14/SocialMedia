import express from "express";
import {
    editProfile,
    followUser,
    getAllUsers,
    getUser,
    getUserByID,
    getUserByUsername,
    getUserForSidebar,
    likePost,
    savePost,
    searchUsers,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const route = express.Router();

route.get("/", protect, getUser);

route.get("/users", getAllUsers);

route.get("/getUserForSidebar", protect, getUserForSidebar);

route.get("/search/:keyword?", searchUsers);

route.get("/:id", getUserByID);

route.get("/u/:userName", getUserByUsername);

route.patch("/account/edit/:id", editProfile);

route.put("/:userId/like", likePost);

route.put("/:userId/save", savePost);

route.put("/:userId/new-follow", followUser);

export default route;
