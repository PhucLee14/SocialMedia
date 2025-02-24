import express from "express";
import { getUserByID } from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const route = express.Router();

route.get("/", protect, getUserByID);

export default route;
