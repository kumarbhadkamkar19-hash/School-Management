import Student from "../models/Student.model.js";
import Attendance from "../models/Attendance.model.js";
import Assignment from "../models/Assignment.model.js";
import Timetable from "../models/Timetable.model.js";

// 🔹 Get All Students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Mark Attendance
export const markAttendance = async (req, res) => {
  try {
    const { studentId, status } = req.body;

    const attendance = await Attendance.create({
      student: studentId,
      status
    });

    res.status(201).json({
      message: "Attendance marked",
      attendance
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Upload Assignment
export const createAssignment = async (req, res) => {
  try {
    const { title, file } = req.body;

    const assignment = await Assignment.create({
      title,
      file,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Assignment uploaded",
      assignment
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔹 Upload Timetable
export const createTimetable = async (req, res) => {
  try {
    const { title, file } = req.body;

    const timetable = await Timetable.create({
      title,
      file,
      createdBy: req.user.id
    });

    res.status(201).json({
      message: "Timetable uploaded",
      timetable
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};