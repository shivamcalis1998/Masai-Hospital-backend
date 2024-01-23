const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  name: String,
  image: String,
  specialization: {
    type: String,
    enum: ["Cardiologist", "Dermatologist", "Pediatrician", "Psychiatrist"],
  },
  experience: Number,
  location: String,
  date: { type: Date, default: Date.now },
  slots: Number,
  fee: Number,
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
