import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    firstName: String,
    middleName: String,
    lastName: String,
    dob: Date,
    standard: {
      type: Number,
      min: 1,
      max: 10
    },
    division: String,
    rollNumber: Number,

    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    phone: String,
    gender: String,
    nationality: String,

    permanentAddress: String,
    currentAddress: String,

    emergencyContact: String,
    lastSchool: String,
    lastPercentage: Number,

    photo: String
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);