const Vital = require("../models/Vital");

// Add vitals for a patient
const addVitals = async (req, res) => {
  const { patientId } = req.params;
  const { recordedBy, heartRate, bloodPressure, temperature, oxygenLevel } =
    req.body;

  try {
    // Create a new vitals record
    const newVital = new Vital({
      patientId,
      recordedBy,
      heartRate,
      bloodPressure,
      temperature,
      oxygenLevel,
    });

    // Save the vitals record to the database
    await newVital.save();

    res
      .status(201)
      .json({ message: "Vitals recorded successfully", vital: newVital });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get vitals history for a patient
const getVitalsHistory = async (req, res) => {
  const { patientId } = req.params;

  try {
    // Find all vitals records for the patient
    const vitals = await Vital.find({ patientId }).sort({ timestamp: -1 });

    res.status(200).json({ vitals });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  addVitals,
  getVitalsHistory,
};