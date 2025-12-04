import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    // ✅ Verify token from Google
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub, name, email, picture } = payload;

    // ✅ Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        googleId: sub,
        name,
        email,
        profilePic: picture,
      });
    }

    // ✅ CREATE JWT TOKEN
    const jwtToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      token: jwtToken, // ✅ SEND TOKEN TO FRONTEND
      user,
    });
  } catch (error) {
    console.error("Google Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Google login failed",
    });
  }
};
