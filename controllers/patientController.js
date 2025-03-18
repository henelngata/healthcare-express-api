const Patient = require("../models/Patient");

// Add a new patient
const addPatient = async (req, res) => {
  const {
    firstName,
    lastName,
    gender,
    age,
    contactInfo,
    emergencyContact,
    assignedDoctor,
    assignedNurses,
    ward,
  } = req.body;

  try {
    // Create a new patient
    const newPatient = new Patient({
      firstName,
      lastName,
      gender,
      age,
      contactInfo,
      emergencyContact,
      assignedDoctor,
      assignedNurses,
      ward,
    });

    // Save the patient to the database
    await newPatient.save();

    res
      .status(201)
      .json({ message: "Patient added successfully", patient: newPatient });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// Update patient details
const updatePatient = async (req, res) => {
  const { patientId } = req.params;
  const updateData = req.body;

  try {
    // Find the patient and update their details
    const updatedPatient = await Patient.findByIdAndUpdate(patientId, updateData, {
      new: true,
    });

    if (!updatedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ message: "Patient updated successfully", patient: updatedPatient });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get patient details
const getPatientDetails = async (req, res) => {
  const { patientId } = req.params;

  try {
    // Find the patient by ID
    const patient = await Patient.findById(patientId)
      .populate("assignedDoctor", "firstName lastName email")
      .populate("assignedNurses", "firstName lastName email");

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ patient });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Discharge a patient
const dischargePatient = async (req, res) => {
  const { patientId } = req.params;

  try {
    // Find the patient and update their status to "Discharged"
    const dischargedPatient = await Patient.findByIdAndUpdate(
      patientId,
      { status: "Discharged" },
      { new: true }
    );

    if (!dischargedPatient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json({ message: "Patient discharged successfully", patient: dischargedPatient });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  addPatient,
  updatePatient,
  getPatientDetails,
  dischargePatient,
};