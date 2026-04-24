import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    title: String,
    file: String, // PDF URL

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Assignment", assignmentSchema);
