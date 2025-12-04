import mongoose from "mongoose";

const progressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
      required: true,
    },

    isSolved: {
      type: Boolean,
      default: false,
    },

    solvedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// ✅ One user can have only one progress record per question
progressSchema.index({ userId: 1, questionId: 1 }, { unique: true });

export default mongoose.model("Progress", progressSchema);
