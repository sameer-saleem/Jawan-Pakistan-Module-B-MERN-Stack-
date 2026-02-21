const mongoose = require("mongoose");

// ─────────────────────────────────────────────────────────
// APPOINTMENT MODEL
// Created when a patient books a slot.
// Links: patient (User) + doctor + slot together.
// Status changes: pending → confirmed → completed/cancelled
// ─────────────────────────────────────────────────────────
const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",      // the logged-in user who booked
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",    // which doctor
    required: true,
  },
  slot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Slot",      // which time slot
    required: true,
  },
  date: {
    type: String,     // "2024-12-05"
    required: true,
  },
  time: {
    type: String,     // "09:30 AM"
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"],
    default: "confirmed",
  },
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);