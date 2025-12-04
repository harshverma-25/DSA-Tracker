import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Test protected route
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ You accessed a protected route",
    user: req.user,
  });
});

export default router;
