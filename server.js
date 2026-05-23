// server.js
import app from "./app.js";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// ✅ Load environment variables FIRST
dotenv.config();

// ✅ Connect to MongoDB
connectDB();

// ✅ Server Port
const PORT = process.env.PORT || 5000;

// ✅ Start Server - Listen on 0.0.0.0 for Render.com
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔗 API Base: https://school-management-z9ml.onrender.com`);
});

// ✅ Handle Unhandled Promise Rejections (prevents silent crashes)
process.on("unhandledRejection", (err) => {
  console.error("❌ Unhandled Rejection:", err.message);
  console.error(err.stack);
  // In production, let PM2/Render handle restarts
  if (process.env.NODE_ENV !== "production") {
    process.exit(1);
  }
});

// ✅ Handle Uncaught Exceptions (last resort)
process.on("uncaughtException", (err) => {
  console.error("❌ Uncaught Exception:", err.message);
  console.error(err.stack);
  process.exit(1);
});