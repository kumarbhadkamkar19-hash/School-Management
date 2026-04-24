import mongoose from "mongoose";

const noticeSchema = new mongoose.Schema(
  {
    title: String,
    message: String,

    audience: {
      type: String,
      enum: ["ALL", "PARENT", "TEACHER", "FINANCE"]
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Notice", noticeSchema);