import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    practiceLink: {
      type: String,
      required: true,
    },

    sheetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sheet",
      required: true,
    },
    topic: {
    type: String,
    required: true,
     },

  },
  { timestamps: true }
);

export default mongoose.model("Question", questionSchema);
