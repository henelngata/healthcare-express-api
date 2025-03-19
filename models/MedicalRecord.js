const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
    unique: true, // Each patient can have only one medical record
  },
  allergies: {
    type: [String], // Array of strings (e.g., ["Penicillin", "Peanuts"])
    default: [],
  },
  chronicConditions: {
    type: [String], // Array of strings (e.g., ["Diabetes", "Hypertension"])
    default: [],
  },
  pastSurgeries: {
    type: [String], // Array of strings (e.g., ["Appendectomy", "Knee Replacement"])
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the `updatedAt` field before saving the document
medicalRecordSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);
