const express = require("express");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");
const {
  addOrUpdateMedicalRecords,
  getMedicalRecords,
  updateMedicalRecord,
  deleteMedicalRecord
} = require("../controllers/medicalRecordController");

const router = express.Router();

// Add or update medical records for a patient (only doctors)
router.post(
  "/:patientId/medical-records",
  verifyToken,
  checkRole(["doctor"]),
  addOrUpdateMedicalRecords
);

// Get medical records for a patient (doctors and nurses)
router.get(
  "/:patientId/medical-records",
  verifyToken,
  checkRole(["doctor", "nurse"]),
  getMedicalRecords
);
// Update a medical record (only doctors)
router.put("/:patientId/medical-records", verifyToken, checkRole(["doctor"]), updateMedicalRecord);
// Delete a medical record (only doctors)
router.delete("/:patientId/medical-records", verifyToken, checkRole(["doctor"]), deleteMedicalRecord);

module.exports = router;
