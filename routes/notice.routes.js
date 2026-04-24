import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

import {
  createNotice,
  getNotices
} from "../controllers/notice.controller.js";

const router = express.Router();

// 🔹 Create Notice (ONLY ADMIN)
router.post(
  "/",
  authMiddleware,
  roleMiddleware("ADMIN"),
  createNotice
);

// 🔹 Get Notices (ALL ROLES)
router.get(
  "/",
  authMiddleware,
  getNotices
);

export default router;