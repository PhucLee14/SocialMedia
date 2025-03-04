import express from "express";
import {
    createPost,
    getPost,
    getPostById,
} from "../controllers/post.controller.js";
const router = express.Router();

router.post("/create", createPost);
router.get("/", getPost);
router.get("/:id", getPostById);

export default router;
