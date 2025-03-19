const TreatmentPlan = require("../models/TreatmentPlan");

// Add or update a treatment plan
const addOrUpdateTreatmentPlan = async (req, res) => {
  const { patientId } = req.params;
  const { createdBy, diagnosis, medications, labResults, notes } = req.body;

  try {
    // Check if a treatment plan already exists for the patient
    let treatmentPlan = await TreatmentPlan.findOne({ patientId });

    if (treatmentPlan) {
      // Update existing treatment plan
      treatmentPlan.createdBy = createdBy || treatmentPlan.createdBy;
      treatmentPlan.diagnosis = diagnosis || treatmentPlan.diagnosis;
      treatmentPlan.medications = medications || treatmentPlan.medications;
      treatmentPlan.labResults = labResults || treatmentPlan.labResults;
      treatmentPlan.notes = notes || treatmentPlan.notes;
    } else {
      // Create a new treatment plan
      treatmentPlan = new TreatmentPlan({
        patientId,
        createdBy,
        diagnosis,
        medications,
        labResults,
        notes,
      });
    }

    // Save the treatment plan to the database
    await treatmentPlan.save();

    res
      .status(200)
      .json({ message: "Treatment plan updated successfully", treatmentPlan });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a treatment plan
const deleteTreatmentPlan = async (req, res) => {
  const { patientId } = req.params;

  try {
    // Find the treatment plan by patientId and delete it
    const deletedPlan = await TreatmentPlan.findOneAndDelete({ patientId });

    if (!deletedPlan) {
      return res.status(404).json({ message: "Treatment plan not found" });
    }

    res.status(200).json({ message: "Treatment plan deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get treatment plans for a patient
const getTreatmentPlans = async (req, res) => {
  const { patientId } = req.params;

  try {
    // Find the treatment plan for the patient
    const treatmentPlan = await TreatmentPlan.findOne({ patientId });

    if (!treatmentPlan) {
      return res.status(404).json({ message: "Treatment plan not found" });
    }

    res.status(200).json({ treatmentPlan });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  addOrUpdateTreatmentPlan,
  deleteTreatmentPlan,
  getTreatmentPlans,
};