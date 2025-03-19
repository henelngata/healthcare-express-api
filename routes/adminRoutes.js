const express = require("express");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");
const { getAllUsers, deleteUser } = require("../controllers/adminController");

const router = express.Router();

// Get all users (only admins)
router.get("/users", verifyToken, checkRole(["admin"]), getAllUsers);

// Delete a user (only admins)
router.delete("/users/:userId", verifyToken, checkRole(["admin"]), deleteUser);

module.exports = router;
