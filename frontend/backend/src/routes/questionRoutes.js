import express from "express";
import {
  addQuestion,
  getQuestionsBySheet,
  deleteQuestion,
} from "../controllers/questionController.js";
import { protectAdmin } from "../middlewares/adminAuthMiddleware.js";
import { bulkAddQuestionsJSON } from "../controllers/questionController.js";
import { seedQuestionsFromFile } from "../controllers/questionController.js";


const router = express.Router();

// ✅ Public - get questions by sheet ID
router.get("/:sheetId", getQuestionsBySheet);

// ✅ Admin - add question
router.post("/", protectAdmin, addQuestion);

// ✅ Admin - delete question
router.delete("/:id", protectAdmin, deleteQuestion);

router.post("/seed-from-file", protectAdmin, seedQuestionsFromFile);


router.post("/bulk-json", protectAdmin, bulkAddQuestionsJSON);

export default router;
