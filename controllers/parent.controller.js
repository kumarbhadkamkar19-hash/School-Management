import Student from "../models/Student.model.js";
import Attendance from "../models/Attendance.model.js";
import Assignment from "../models/Assignment.model.js";
import Timetable from "../models/Timetable.model.js";
import Notice from "../models/Notice.model.js";
import Fee from "../models/Fee.model.js";


// 🔹 Student Profile
export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findOne({ parent: req.user.id });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Attendance
export const getAttendance = async (req, res) => {
  try {
    const student = await Student.findOne({ parent: req.user.id });

    const attendance = await Attendance.find({
      student: student._id,
    });

    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Assignments
export const getAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Timetable
export const getTimetable = async (req, res) => {
  try {
    const timetable = await Timetable.find();
    res.json(timetable);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Notices
export const getNotices = async (req, res) => {
  try {
    const notices = await Notice.find({
      $or: [{ audience: "ALL" }, { audience: "PARENT" }],
    });

    res.json(notices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// 🔹 Get Fees (Parent)
export const getFees = async (req, res) => {
  try {
    const student = await Student.findOne({ parent: req.user.id });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const fees = await Fee.find({
      student: student._id,
    });

    res.json({
      success: true,
      count: fees.length,
      fees,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
