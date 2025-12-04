import express from "express";
import {
  toggleSolved,
  getUserProgress,
} from "../controllers/progressController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Get all user solved progress
router.get("/", protect, getUserProgress);

// ✅ Toggle solved
router.post("/", protect, toggleSolved);

export default router;
