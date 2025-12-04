import Question from "../models/Question.js";
import Sheet from "../models/Sheet.js";
import fs from "fs";
import path from "path";

// ✅ Admin adds a question to a sheet
export const addQuestion = async (req, res) => {
  try {
    const { title, difficulty, practiceLink, sheetId } = req.body;

    if (!title || !difficulty || !practiceLink || !sheetId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // ✅ Check sheet exists
    const sheet = await Sheet.findById(sheetId);
    if (!sheet) {
      return res.status(404).json({ message: "Sheet not found" });
    }

    const question = await Question.create({
      title,
      difficulty,
      practiceLink,
      sheetId,
      topic,
    });

    res.status(201).json({
      success: true,
      message: "✅ Question added successfully",
      question,
    });
  } catch (error) {
    console.error("Add Question Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get all questions by Sheet ID (Public)
export const getQuestionsBySheet = async (req, res) => {
  try {
    const { sheetId } = req.params;

    const questions = await Question.find({ sheetId }).sort({
      createdAt: 1,
    });

    res.status(200).json({
      success: true,
      count: questions.length,
      questions,
    });
  } catch (error) {
    console.error("Get Questions Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Admin deletes a question
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findById(id);

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    await question.deleteOne();

    res.status(200).json({
      success: true,
      message: "✅ Question deleted successfully",
    });
  } catch (error) {
    console.error("Delete Question Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ BULK ADD QUESTIONS (ADMIN ONLY)
// ✅ BULK ADD QUESTIONS USING JSON (ADMIN ONLY)
export const bulkAddQuestionsJSON = async (req, res) => {
  try {
    const { sheetId, questions } = req.body;

    if (!sheetId || !questions || !Array.isArray(questions)) {
      return res.status(400).json({
        message: "sheetId and questions array are required",
      });
    }

    if (questions.length === 0) {
      return res.status(400).json({
        message: "Questions array cannot be empty",
      });
    }

    // ✅ Validate & format questions
    const formattedQuestions = questions.map((q) => ({
      title: q.title,
      difficulty: q.difficulty,
      practiceLink: q.practiceLink,
      sheetId,
    }));

    // ✅ Insert in bulk
    await Question.insertMany(formattedQuestions);

    res.status(201).json({
      success: true,
      message: `✅ ${formattedQuestions.length} questions added successfully`,
    });
  } catch (error) {
    console.error("JSON Bulk Add Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// ✅ SEED QUESTIONS FROM JSON FILE (ADMIN ONLY)
export const seedQuestionsFromFile = async (req, res) => {
  try {
    const { sheetId, fileName } = req.body;

    if (!sheetId || !fileName) {
      return res.status(400).json({
        message: "sheetId and fileName are required",
      });
    }

    // ✅ Absolute path to seedData folder
    const filePath = path.join(
      process.cwd(),
      "seedData",
      fileName
    );

    // ✅ Check file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        message: "JSON file not found in seedData folder",
      });
    }

    // ✅ Read & parse file
    const rawData = fs.readFileSync(filePath);
    const questions = JSON.parse(rawData);

    if (!Array.isArray(questions) || questions.length === 0) {
      return res.status(400).json({
        message: "JSON file must contain an array of questions",
      });
    }

    // ✅ Attach sheetId
    const formattedQuestions = questions.map((q) => ({
      title: q.title,
      difficulty: q.difficulty,
      practiceLink: q.practiceLink,
      sheetId,
        topic: q.topic,
    }));

    // ✅ Insert all
    await Question.insertMany(formattedQuestions);

    res.status(201).json({
      success: true,
      message: `✅ ${formattedQuestions.length} questions imported from ${fileName}`,
    });
  } catch (error) {
    console.error("Seed From File Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};



