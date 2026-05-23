import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

import {
  addEmployee,
  createStudent,
  getStudents,
  updateStudent,
} from "../controllers/admin.controller.js";

import { getAdminProfile } from "../controllers/profile.controller.js";

const router = express.Router();

// 🔹 Admin Profile
router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAdminProfile,
);

// 🔹 Add Employee
router.post(
  "/add-employee",
  authMiddleware,
  roleMiddleware("ADMIN"),
  addEmployee,
);

// 🔹 Create Student - POST /api/admin/student
router.post("/student", authMiddleware, roleMiddleware("ADMIN"), createStudent);

// 🔹 Get All Students - GET /api/admin/students
router.get("/students", authMiddleware, roleMiddleware("ADMIN"), getStudents);

// 🔹 Update Student - PUT /api/admin/student/:id
router.put(
  "/student/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateStudent,
);

// 🔹 Delete Student - DELETE /api/admin/student/:id (Bonus)
router.delete(
  "/student/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  async (req, res) => {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);

      if (!student) {
        return res
          .status(404)
          .json({ success: false, message: "Student not found" });
      }

      res
        .status(200)
        .json({ success: true, message: "Student deleted successfully" });
    } catch (error) {
      console.error("❌ deleteStudent Error:", error);
      res.status(500).json({ success: false, message: error.message });
    }
  },
);

export default router;
