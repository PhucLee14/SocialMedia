import express from "express";
import {
    createPost,
    getPost,
    getPostById,
    getPostByUserId,
    likePost,
    savePost,
} from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create", createPost);
router.get("/", getPost);
router.get("/:id", getPostById);
router.get("/u/:id", getPostByUserId);
router.put("/:postId/like", likePost);
router.put("/:postId/save", savePost);

export default router;
