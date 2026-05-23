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

// 🔹 Create Student
router.post("/student", authMiddleware, roleMiddleware("ADMIN"), createStudent);

// 🔹 Get All Students
router.get("/students", authMiddleware, roleMiddleware("ADMIN"), getStudents);

// 🔹 Update Student
router.put(
  "/student/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateStudent,
);

export default router;
