import express from "express";
import { getComments, sendComment } from "../controllers/comment.controller.js";
const router = express.Router();

router.get("/:postId", getComments);
router.post("/send-comment", sendComment);

export default router;
