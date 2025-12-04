import express from "express";
import cors from "cors";

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

//import Routes
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import adminProtectedRoutes from "./routes/adminProtectedRoutes.js";
import sheetRoutes from "./routes/sheetRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import bookmarkRoutes from "./routes/bookmarkRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";




// routes declaration
app.use("/api/auth", authRoutes);
app.use("/api/protected", protectedRoutes);
app.use("/api/admin", adminAuthRoutes);
app.use("/api/admin-protected", adminProtectedRoutes);
app.use("/api/sheets", sheetRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/bookmarks", bookmarkRoutes);
app.use("/api/progress", progressRoutes);





// ✅ Test Route
app.get("/", (req, res) => {
  res.send("DSA Tracker Backend is Running ✅");
});

export default app;
