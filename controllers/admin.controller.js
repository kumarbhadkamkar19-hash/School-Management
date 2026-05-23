import User from "../models/User.model.js";
import Student from "../models/Student.model.js";

// 🔹 Add Employee (Teacher / Finance)
export const addEmployee = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!["TEACHER", "FINANCE"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: "User already exists" });
    }

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
    console.error("❌ addEmployee Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// 🔹 Create Student ✅ FIXED
export const createStudent = async (req, res) => {
  try {
    // 🔍 DEBUG: Log what we receive
    console.log(
      "📦 CREATE STUDENT - req.body:",
      JSON.stringify(req.body, null, 2),
    );

    const { firstName, lastName, standard, division, rollNumber } = req.body;

    // ✅ Validate required fields
    if (!firstName || !lastName || !standard || !division || !rollNumber) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: firstName, lastName, standard, division, rollNumber",
        received: req.body,
      });
    }

    // ✅ Check duplicate roll number
    const existing = await Student.findOne({
      standard,
      division,
      rollNumber,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: `Student with Roll ${rollNumber} already exists in Class ${standard}-${division}`,
      });
    }

    // ✅ Create student with cleaned data
    const student = await Student.create({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      middleName: req.body.middleName?.trim(),
      standard: Number(standard),
      division: division.trim().toUpperCase(),
      rollNumber: Number(rollNumber),
      email: req.body.email?.trim(),
      dob: req.body.dob ? new Date(req.body.dob) : undefined,
      gender: req.body.gender?.trim(),
      phone: req.body.phone?.trim(),
      parent: req.body.parent,
      permanentAddress: req.body.permanentAddress?.trim(),
      currentAddress: req.body.currentAddress?.trim(),
      emergencyContact: req.body.emergencyContact?.trim(),
      lastSchool: req.body.lastSchool?.trim(),
      lastPercentage: req.body.lastPercentage
        ? Number(req.body.lastPercentage)
        : undefined,
      nationality: req.body.nationality?.trim(),
      photo: req.body.photo?.trim(),
    });

    console.log("✅ Student created:", student._id);

    res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
    });
  } catch (error) {
    console.error("❌ createStudent Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
      error: process.env.NODE_ENV === "development" ? error.stack : undefined,
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
    console.error("❌ getStudents Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};

// 🔹 Update Student ✅ FIXED
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔍 DEBUG: Log update request
    console.log(
      `✏️ UPDATE STUDENT ${id} - req.body:`,
      JSON.stringify(req.body, null, 2),
    );

    // ✅ Clean and type-convert update data
    const updateData = { ...req.body };

    if (updateData.firstName)
      updateData.firstName = updateData.firstName.trim();
    if (updateData.lastName) updateData.lastName = updateData.lastName.trim();
    if (updateData.standard) updateData.standard = Number(updateData.standard);
    if (updateData.division)
      updateData.division = updateData.division.trim().toUpperCase();
    if (updateData.rollNumber)
      updateData.rollNumber = Number(updateData.rollNumber);
    if (updateData.dob) updateData.dob = new Date(updateData.dob);
    if (updateData.lastPercentage)
      updateData.lastPercentage = Number(updateData.lastPercentage);

    // ✅ Check duplicate roll number (exclude current student)
    if (updateData.standard && updateData.division && updateData.rollNumber) {
      const duplicate = await Student.findOne({
        standard: updateData.standard,
        division: updateData.division,
        rollNumber: updateData.rollNumber,
        _id: { $ne: id },
      });

      if (duplicate) {
        return res.status(400).json({
          success: false,
          message: `Roll ${updateData.rollNumber} already exists in ${updateData.standard}-${updateData.division}`,
        });
      }
    }

    const student = await Student.findByIdAndUpdate(
      id,
      { $set: updateData },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    console.log("✅ Student updated:", student._id);

    res.status(200).json({
      success: true,
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    console.error("❌ updateStudent Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Server error",
    });
  }
};
