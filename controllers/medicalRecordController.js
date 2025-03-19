const MedicalRecord = require("../models/MedicalRecord");

// Add or update medical records for a patient
const addOrUpdateMedicalRecords = async (req, res) => {
  const { patientId } = req.params;
  const { allergies, chronicConditions, pastSurgeries } = req.body;

  try {
    // Check if a medical record already exists for the patient
    let medicalRecord = await MedicalRecord.findOne({ patientId });

    if (medicalRecord) {
      // Update existing medical record
      medicalRecord.allergies = allergies || medicalRecord.allergies;
      medicalRecord.chronicConditions =
        chronicConditions || medicalRecord.chronicConditions;
      medicalRecord.pastSurgeries =
        pastSurgeries || medicalRecord.pastSurgeries;
    } else {
      // Create a new medical record
      medicalRecord = new MedicalRecord({
        patientId,
        allergies,
        chronicConditions,
        pastSurgeries,
      });
    }

    // Save the medical record to the database
    await medicalRecord.save();

    res
      .status(200)
      .json({ message: "Medical records updated successfully", medicalRecord });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// Get medical records for a patient
const getMedicalRecords = async (req, res) => {
  const { patientId } = req.params;

  try {
    // Find the medical record for the patient
    const medicalRecord = await MedicalRecord.findOne({ patientId });

    if (!medicalRecord) {
      return res.status(404).json({ message: "Medical records not found" });
    }

    res.status(200).json({ medicalRecord });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update a medical record
const updateMedicalRecord = async (req, res) => {
  const { patientId } = req.params;
  const { allergies, chronicConditions, pastSurgeries } = req.body;

  try {
    // Find the medical record by patientId and update it
    const updatedRecord = await MedicalRecord.findOneAndUpdate(
      { patientId }, // Filter by patientId
      { allergies, chronicConditions, pastSurgeries }, // New data
      { new: true } // Return the updated document
    );

    if (!updatedRecord) {
      return res.status(404).json({ message: "Medical record not found" });
    }

    res.status(200).json({ message: "Medical record updated successfully", medicalRecord: updatedRecord });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
// Delete a medical record
const deleteMedicalRecord = async (req, res) => {
  const { patientId } = req.params;

  try {
    // Find the medical record by patientId and delete it
    const deletedRecord = await MedicalRecord.findOneAndDelete({ patientId });

    if (!deletedRecord) {
      return res.status(404).json({ message: "Medical record not found" });
    }

    res.status(200).json({ message: "Medical record deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
module.exports = {
  addOrUpdateMedicalRecords,
  getMedicalRecords,
  updateMedicalRecord,
  deleteMedicalRecord
};