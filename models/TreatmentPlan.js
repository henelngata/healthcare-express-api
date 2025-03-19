const mongoose = require("mongoose");

const treatmentPlanSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  diagnosis: {
    type: String,
    required: true,
  },
  medications: [
    {
      name: { type: String, required: true },
      dosage: { type: String, required: true },
      duration: { type: String, required: true },
    },
  ],
  labResults: [
    {
      testName: { type: String, required: true },
      result: { type: String, required: true },
    },
  ],
  notes: {
    type: String,
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
treatmentPlanSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("TreatmentPlan", treatmentPlanSchema);
