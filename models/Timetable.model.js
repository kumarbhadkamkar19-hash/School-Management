import mongoose from "mongoose";

const timetableSchema = new mongoose.Schema(
  {
    title: String,
    file: String, // PDF URL

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Timetable", timetableSchema);