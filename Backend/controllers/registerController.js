import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import path from 'path';
import UserModel from '../models/UserModel.js';

// Route to serve the register HTML form
const getRegisterPage = (req, res) => {
    res.sendFile(path.join(process.cwd(), 'views', 'register.html'));
};

// GET: Fetch all registered users (excluding passwords)
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({}, '-password'); // exclude password
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server error while fetching users" });
  }
};

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 11);
    const user = new UserModel({ name, email, password: hashPassword, role });

    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      role: user.role,
      name: user.name,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

export { register, getRegisterPage, getAllUsers };
