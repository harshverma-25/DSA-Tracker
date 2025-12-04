import Progress from "../models/Progress.js";
import Question from "../models/Question.js"; // ✅ IMPORTANT: import Question

// ✅ Mark question as solved / unsolved
export const toggleSolved = async (req, res) => {
  try {
    const { questionId } = req.body;
    const userId = req.user._id;

    if (!questionId) {
      return res.status(400).json({ message: "Question ID is required" });
    }

    let progress = await Progress.findOne({ userId, questionId });

    // ✅ If progress does not exist → create as solved
    if (!progress) {
      progress = await Progress.create({
        userId,
        questionId,
        isSolved: true,
        solvedAt: new Date(),
      });

      return res.status(201).json({
        success: true,
        message: "✅ Question marked as solved",
        progress,
      });
    }

    // ✅ If already exists → toggle solved/unsolved
    progress.isSolved = !progress.isSolved;
    progress.solvedAt = progress.isSolved ? new Date() : null;

    await progress.save();

    res.status(200).json({
      success: true,
      message: progress.isSolved
        ? "✅ Question marked as solved"
        : "❌ Question marked as unsolved",
      progress,
    });
  } catch (error) {
    console.error("Toggle Solved Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ ✅ ✅ PERMANENTLY SAFE: Get solved status of all user progress
export const getUserProgress = async (req, res) => {
  try {
    const userId = req.user._id;

    // ✅ 1. Get all user progress
    const progress = await Progress.find({ userId });

    // ✅ 2. Get all valid questions from DB
    const validQuestions = await Question.find({}, "_id");
    const validQuestionIds = validQuestions.map((q) =>
      q._id.toString()
    );

    // ✅ 3. FILTER: Only keep progress whose question still exists
    const cleanedProgress = progress.filter((p) =>
      validQuestionIds.includes(p.questionId.toString())
    );

    res.status(200).json({
      success: true,
      progress: cleanedProgress,
    });
  } catch (error) {
    console.error("Get Progress Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
