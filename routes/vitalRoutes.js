const express = require("express");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");
const {
  addVitals,
  getVitalsHistory,
} = require("../controllers/vitalController");

const router = express.Router();

// Add vitals for a patient (only nurses)
router.post("/:patientId/vitals", verifyToken, checkRole(["nurse"]), addVitals);

// Get vitals history for a patient (doctors and nurses)
router.get(
  "/:patientId/vitals",
  verifyToken,
  checkRole(["doctor", "nurse"]),
  getVitalsHistory
);

module.exports = router;
