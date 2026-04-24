import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";
import { updateStudent } from "../controllers/admin.controller.js";

import { getAdminProfile } from "../controllers/profile.controller.js";

import {
  addEmployee,
  createStudent,
  getStudents
} from "../controllers/admin.controller.js";

const router = express.Router();

// 🔹 Update Student
router.put(
  "/student/:id",
  authMiddleware,
  roleMiddleware("ADMIN"),
  updateStudent
);
// 🔹 Admin Profile
router.get(
  "/profile",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getAdminProfile
);


// 🔹 Add Employee (Teacher / Finance)
router.post(
  "/add-employee",
  authMiddleware,
  roleMiddleware("ADMIN"),
  addEmployee
);


// 🔹 Student Create
router.post(
  "/student",
  authMiddleware,
  roleMiddleware("ADMIN"),
  createStudent
);


// 🔹 Get All Students
router.get(
  "/students",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getStudents
);


export default router;