import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

import {
  getStudentProfile,
  getAttendance,
  getAssignments,
  getTimetable,
  getNotices
} from "../controllers/parent.controller.js";

const router = express.Router();

router.get(
  "/student",
  authMiddleware,
  roleMiddleware("PARENT"),
  getStudentProfile
);

router.get(
  "/attendance",
  authMiddleware,
  roleMiddleware("PARENT"),
  getAttendance
);

router.get(
  "/assignments",
  authMiddleware,
  roleMiddleware("PARENT"),
  getAssignments
);

router.get(
  "/timetable",
  authMiddleware,
  roleMiddleware("PARENT"),
  getTimetable
);

router.get(
  "/notices",
  authMiddleware,
  roleMiddleware("PARENT"),
  getNotices
);
import { getFees } from "../controllers/parent.controller.js";

router.get(
  "/fees",
  authMiddleware,
  roleMiddleware("PARENT"),
  getFees
);
export default router;