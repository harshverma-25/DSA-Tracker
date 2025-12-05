import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

// ✅ FIXED CORS Configuration
const corsOptions = {
  origin: [
    "http://localhost:5173", // Local development
    "https://dsa-tracker-hv.netlify.app", // Your Vercel/Netlify frontend
  ].filter(Boolean), // Remove any falsy values
  credentials: true, // Allow cookies/sessions
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers",
  ],
  exposedHeaders: ["Content-Range", "X-Content-Range"],
  maxAge: 86400, // 24 hours
};

app.use(cors(corsOptions));

// ✅ Handle preflight requests


// ✅ Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Request logger middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// ✅ Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "dsa-tracker-backend",
  });
});

// Import Routes
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import adminProtectedRoutes from "./routes/adminProtectedRoutes.js";
import sheetRoutes from "./routes/sheetRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";

// Routes Declaration
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin-protected", adminProtectedRoutes);
app.use("/api/sheets", sheetRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/progress", progressRoutes);

// ✅ 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.url} not found`,
  });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  
  const statusCode = err.status || 500;
  const message = err.message || "Internal Server Error";
  
  res.status(statusCode).json({
    success: false,
    message,
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

// ✅ Test Route
app.get("/", (req, res) => {
  res.json({
    message: "DSA Tracker Backend is Running ✅",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
    docs: "/api-docs", // Add if you have Swagger/OpenAPI
    health: "/health",
  });
});

export default app;