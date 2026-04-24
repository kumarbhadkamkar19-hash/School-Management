import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

import {
  getStudents,
  markAttendance,
  createAssignment,
  createTimetable,
} from "../controllers/teacher.controller.js";

const router = express.Router();

router.get("/students", authMiddleware, roleMiddleware("TEACHER"), getStudents);

router.post(
  "/attendance",
  authMiddleware,
  roleMiddleware("TEACHER"),
  markAttendance,
);
router.post(
  "/assignment",
  authMiddleware,
  roleMiddleware("TEACHER"),
  createAssignment,
);

router.post(
  "/timetable",
  authMiddleware,
  roleMiddleware("TEACHER"),
  createTimetable,
);

export default router;
