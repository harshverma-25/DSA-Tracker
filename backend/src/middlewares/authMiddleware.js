import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
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

      // ✅ Attach user to request (without sensitive fields)
      req.user = await User.findById(decoded.userId).select("-__v");

      next(); // ✅ allow request
    } catch (error) {
      return res.status(401).json({ message: "❌ Invalid Token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "❌ No Token Provided" });
  }
};
