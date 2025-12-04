import mongoose from "mongoose";

const sheetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },
      image: {
      type: String,
      default: "",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // admin user
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Sheet", sheetSchema);
