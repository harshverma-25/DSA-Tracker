import express from "express";
import {
  createSheet,
  getAllSheets,
  deleteSheet,
} from "../controllers/sheetController.js";
import { protectAdmin } from "../middlewares/adminAuthMiddleware.js";
import { getSingleSheet } from "../controllers/sheetController.js";

const router = express.Router();

// ✅ Public - get all sheets
router.get("/", getAllSheets);

// ✅ Admin - create sheet
router.post("/", protectAdmin, createSheet);

// ✅ Admin - delete sheet
router.delete("/:id", protectAdmin, deleteSheet);

router.get("/:id", getSingleSheet);


export default router;
