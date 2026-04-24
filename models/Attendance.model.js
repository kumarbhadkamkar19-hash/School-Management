import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["PRESENT", "ABSENT"],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Attendance", attendanceSchema);
