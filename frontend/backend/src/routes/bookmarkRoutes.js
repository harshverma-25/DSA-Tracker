import express from "express";
import {
  addBookmark,
  removeBookmark,
  getUserBookmarks,
} from "../controllers/bookmarkController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Get all user bookmarks
router.get("/", protect, getUserBookmarks);

// ✅ User add bookmark
router.post("/", protect, addBookmark);

// ✅ User remove bookmark
router.delete("/:questionId", protect, removeBookmark);

export default router;
