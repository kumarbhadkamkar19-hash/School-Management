import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import roleMiddleware from "../middleware/role.middleware.js";

import {
  createFee,
  getFees,
  updateFee,
  deleteFee
} from "../controllers/finance.controller.js";

const router = express.Router();

// CREATE
router.post(
  "/",
  authMiddleware,
  roleMiddleware("FINANCE"),
  createFee
);

// READ
router.get(
  "/",
  authMiddleware,
  roleMiddleware("FINANCE"),
  getFees
);

// UPDATE
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("FINANCE"),
  updateFee
);

// DELETE
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("FINANCE"),
  deleteFee
);

export default router;