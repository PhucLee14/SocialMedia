import express from "express";
import { getMessages, sendMessage } from "../controllers/message.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:id", protect, getMessages);
router.post("/send/:id", protect, sendMessage);

export default router;
