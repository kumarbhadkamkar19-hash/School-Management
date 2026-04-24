import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import parentRoutes from "./routes/parent.routes.js";
import financeRoutes from "./routes/finance.routes.js";
import noticeRoutes from "./routes/notice.routes.js";

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// test route (optional but useful)
app.get("/", (req, res) => {
  res.send("🚀 School Management API Running");
});

// routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/notice", noticeRoutes);

export default app;
