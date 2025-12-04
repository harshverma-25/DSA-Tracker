import express from "express";
import { protectAdmin } from "../middlewares/adminAuthMiddleware.js";

const router = express.Router();

// ✅ Test admin protected route
router.get("/me", protectAdmin, (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ Admin protected route accessed",
    admin: req.admin,
  });
});

export default router;
