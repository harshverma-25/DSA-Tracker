import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const protectAdmin = async (req, res, next) => {
  let token;

  // ✅ Check token in header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      // ✅ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Attach admin to request
      req.admin = await Admin.findById(decoded.adminId).select("-password");

      if (!req.admin) {
        return res.status(401).json({ message: "❌ Admin not authorized" });
      }

      next(); // ✅ allow request
    } catch (error) {
      return res.status(401).json({ message: "❌ Invalid Admin Token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "❌ No Admin Token Provided" });
  }
};
