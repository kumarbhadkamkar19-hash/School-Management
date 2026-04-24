import User from "../models/User.model.js";
import Student from "../models/Student.model.js";

// 🔹 Add Employee (Teacher / Finance)
export const addEmployee = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // role check
    if (!["TEACHER", "FINANCE"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // check existing user
    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create user
    const user = await User.create({
      name,
      email,
      password,
      role,
    });

    res.status(201).json({
      success: true,
      message: "Employee added successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Student Registration
export const createStudent = async (req, res) => {
  try {
    const student = await Student.create(req.body);

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 Get All Students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find()
      .populate("parent", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: students.length,
      students,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// 🔹 Update Student (Add Parent Link)
export const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    res.json({
      success: true,
      message: "Student updated",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
