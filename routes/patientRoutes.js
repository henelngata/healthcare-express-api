const express = require("express");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");
const {
  addPatient,
  updatePatient,
  getPatientDetails,
  dischargePatient,
} = require("../controllers/patientController");

const router = express.Router();

// Add a new patient (only doctors and admins)
router.post("/", verifyToken, checkRole(["doctor", "admin"]), addPatient);

// Update patient details (only doctors and admins)
router.put(
  "/:patientId",
  verifyToken,
  checkRole(["doctor", "admin"]),
  updatePatient
);

// Get patient details (doctors, nurses, and admins)
router.get(
  "/:patientId",
  verifyToken,
  checkRole(["doctor", "nurse", "admin"]),
  getPatientDetails
);

// Discharge a patient (only doctors and admins)
router.put(
  "/:patientId/discharge",
  verifyToken,
  checkRole(["doctor", "admin"]),
  dischargePatient
);

module.exports = router;
