const User = require("../models/User");

// Get all users (doctors, nurses, admins)
const getAllUsers = async (req, res) => {
  try {
    // Find all users and exclude the password field
    const users = await User.find({}, { password: 0 });

    res.status(200).json({ users });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// Delete a user
const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by ID and delete them
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};