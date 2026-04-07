import express from "express";
import { uploadImage, uploadImages } from "../controllers/upload.controller.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/image", upload.single("image"), uploadImage);
router.post("/images", upload.array("images", 10), uploadImages);

export default router;
