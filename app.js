const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const vitalRoutes = require("./routes/vitalRoutes");
const medicalRecordRoutes = require("./routes/medicalRecordRoutes");
const treatmentPlanRoutes = require("./routes/treatmentPlanRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("Hospital Management System API");
});


app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/patients", vitalRoutes);
app.use("/api/patients", medicalRecordRoutes); // Medical records routes are nested under patients
app.use("/api/patients", treatmentPlanRoutes);
app.use("/api/admin", adminRoutes); // Admin routes

module.exports = app;
