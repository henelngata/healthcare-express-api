const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  contactInfo: {
    phone: { type: String, required: true },
    email: { type: String },
  },
  emergencyContact: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    relationship: { type: String, required: true },
  },
  assignedDoctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignedNurses: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  admissionDate: { type: Date, default: Date.now },
  ward: { type: String, required: true },
  status: {
    type: String,
    enum: ["Admitted", "Discharged"],
    default: "Admitted",
  },
});

module.exports = mongoose.model("Patient", patientSchema);
