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

    // ✅ Find user by email
    let user = await User.findOne({ email });

    // ✅ CASE 1: User exists but googleId missing (OLD USER)
    if (user && !user.googleId) {
      user.googleId = sub;
      user.profilePic = picture;
      await user.save();
    }

    // ✅ CASE 2: Totally new user
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

    // ✅ CLEAN USER OBJECT (FRONTEND SAFE)
    const cleanUser = {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      profilePic: user.profilePic,
      googleId: user.googleId,
    };

    res.status(200).json({
      success: true,
      token: jwtToken,
      user: cleanUser,
    });

    console.log("✅ Google login successful for:", email);

  } catch (error) {
    console.error("❌ Google Login Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Google login failed. Please try again.",
    });
  }
};
