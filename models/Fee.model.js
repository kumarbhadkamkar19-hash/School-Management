    import mongoose from "mongoose";

const feeSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["PAID", "PENDING"],
      default: "PENDING"
    },
    paidDate: Date
  },
  { timestamps: true }
);

export default mongoose.model("Fee", feeSchema);