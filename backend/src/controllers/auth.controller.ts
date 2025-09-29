import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { Document } from "mongoose";

/**
 * User Document Interface
 */
interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
}

/**
 * Request Interfaces
 */
interface RegisterRequest extends Request {
  body: {
    username: string;
    email: string;
    password: string;
    role?: string;
  };
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

/**
 * Generate JWT Token
 */
const generateToken = (userId: string) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || "fallback_secret",
    { expiresIn: "24h" }
  );
};

/**
 * Register User
 */
export const register = async (req: RegisterRequest, res: Response) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id.toString());

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Registration failed" });
  }
};

/**
 * Login User
 */
export const login = async (req: LoginRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = (await User.findOne({ email })) as UserDocument | null;
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken(user._id.toString());

    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role || "user",
      },
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Login failed" });
  }
};

/**
 * Logout
 */
export const logout = async (_req: Request, res: Response) => {
  try {
    return res.json({ message: "Logged out successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Logout failed" });
  }
};

/**
 * Get All Users
 */
export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password"); // exclude password
    return res.json(users);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Fetching users failed" });
  }
};
