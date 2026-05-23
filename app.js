// app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// ✅ Load env vars (in case app.js is run directly in tests)
dotenv.config();

const app = express();

// ════════════════════════════════════════════════════════════
// 🔧 MIDDLEWARE (Order Matters!)
// ════════════════════════════════════════════════════════════

// ✅ Parse JSON bodies (10MB limit for photo uploads)
app.use(express.json({ limit: "10mb" }));

// ✅ Parse URL-encoded bodies (form submissions)
app.use(express.urlencoded({ extended: true }));

// ✅ CORS - Allow Flutter + Postman + Render
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*", // Use env var in production
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    credentials: true, // Allow cookies/auth headers
  }),
);

// ✅ Request Logger (Development Only)
if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      console.log(
        `🔹 ${req.method} ${req.path} → ${res.statusCode} (${duration}ms)`,
      );
    });
    next();
  });
}

// ════════════════════════════════════════════════════════════
// 🏁 ROUTES
// ════════════════════════════════════════════════════════════

// ✅ Health Check (Required for Render.com uptime monitoring)
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "🚀 School Management API is Healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// ✅ Root Test Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 School Management API Running",
    version: "1.0.0",
    endpoints: {
      auth: "/api/auth",
      admin: "/api/admin",
      teacher: "/api/teacher",
      parent: "/api/parent",
      finance: "/api/finance",
      notice: "/api/notice",
    },
  });
});

// ✅ Import & Mount Routes
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import parentRoutes from "./routes/parent.routes.js";
import financeRoutes from "./routes/finance.routes.js";
import noticeRoutes from "./routes/notice.routes.js";

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/parent", parentRoutes);
app.use("/api/finance", financeRoutes);
app.use("/api/notice", noticeRoutes);

// ════════════════════════════════════════════════════════════
// ❌ 404 Handler (Catch Undefined Routes)
// ════════════════════════════════════════════════════════════

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    hint: "Check your endpoint URL and HTTP method",
  });
});

// ════════════════════════════════════════════════════════════
// 🚨 Global Error Handler (Catch All Unhandled Errors)
// ════════════════════════════════════════════════════════════

app.use((err, req, res, next) => {
  console.error("❌ GLOBAL ERROR:", err.stack || err);

  // 🔹 Mongoose Validation Error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: "Validation Error",
      errors: messages,
    });
  }

  // 🔹 MongoDB Duplicate Key Error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(400).json({
      success: false,
      message: `Duplicate ${field}: ${err.keyValue[field]} already exists`,
    });
  }

  // 🔹 JWT Errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Token expired - please login again",
    });
  }

  // 🔹 Default Error Response
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    // Only expose stack trace in development
    error: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

export default app;
