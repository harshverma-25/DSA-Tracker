import Bookmark from "../models/Bookmark.js";

// ✅ Get all bookmarks of logged-in user
export const getUserBookmarks = async (req, res) => {
  try {
    const userId = req.user._id;

    const bookmarks = await Bookmark.find({ userId }).populate("questionId");

    res.status(200).json({
      success: true,
      count: bookmarks.length,
      bookmarks,
    });
  } catch (error) {
    console.error("Get Bookmarks Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ User adds bookmark
export const addBookmark = async (req, res) => {
  try {
    const { questionId } = req.body;
    const userId = req.user._id; // coming from user auth middleware

    if (!questionId) {
      return res.status(400).json({ message: "Question ID is required" });
    }

    const bookmark = await Bookmark.create({
      userId,
      questionId,
    });

    res.status(201).json({
      success: true,
      message: "✅ Question bookmarked",
      bookmark,
    });
  } catch (error) {
    console.error("Add Bookmark Error:", error);

    // duplicate bookmark error
    if (error.code === 11000) {
      return res.status(400).json({ message: "Already bookmarked" });
    }

    res.status(500).json({ message: "Server error" });
  }
};

// ✅ User removes bookmark
export const removeBookmark = async (req, res) => {
  try {
    const { questionId } = req.params;
    const userId = req.user._id;

    const bookmark = await Bookmark.findOneAndDelete({
      userId,
      questionId,
    });

    if (!bookmark) {
      return res.status(404).json({ message: "Bookmark not found" });
    }

    res.status(200).json({
      success: true,
      message: "✅ Bookmark removed",
    });
  } catch (error) {
    console.error("Remove Bookmark Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
