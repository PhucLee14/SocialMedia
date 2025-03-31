import express from "express";
import {
    createPost,
    getPost,
    getPostById,
    likePost,
    savePost,
} from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create", createPost);
router.get("/", getPost);
router.get("/:id", getPostById);
router.put("/:postId/like", likePost);
router.put("/:postId/save", savePost);

export default router;
