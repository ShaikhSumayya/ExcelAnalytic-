import express from 'express';
import UserModel from '../models/UserModel.js'; // Make sure path is correct

const router = express.Router();

// ✅ Get all users
router.get('/', async (req, res) => {
  try {
    const users = await UserModel.find({}, 'name email role'); // Return only name, email, and role
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// ✅ Update user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name, email: req.body.email, role: req.body.role },
      { new: true }
    );
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: 'Update failed' });
  }
});

// DELETE a user by ID
// ✅ Correct
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error during delete" });
  }
});



export default router;
