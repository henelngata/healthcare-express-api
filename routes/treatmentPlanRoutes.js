const express = require("express");
const { verifyToken, checkRole } = require("../middleware/authMiddleware");
const {
  addOrUpdateTreatmentPlan,
  deleteTreatmentPlan,
  getTreatmentPlans,
} = require("../controllers/treatmentPlanController");

const router = express.Router();

// Add or update a treatment plan (only doctors)
router.post(
  "/:patientId/treatment-plans",
  verifyToken,
  checkRole(["doctor"]),
  addOrUpdateTreatmentPlan
);

// Delete a treatment plan (only doctors)
router.delete(
  "/:patientId/treatment-plans",
  verifyToken,
  checkRole(["doctor"]),
  deleteTreatmentPlan
);

// Get treatment plans for a patient (doctors and nurses)
router.get(
  "/:patientId/treatment-plans",
  verifyToken,
  checkRole(["doctor", "nurse"]),
  getTreatmentPlans
);

module.exports = router;
