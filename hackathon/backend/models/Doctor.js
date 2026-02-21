const mongoose = require("mongoose");

// ─────────────────────────────────────────────────────────
// DOCTOR MODEL
// Stores doctors that patients can book appointments with.
// You can add doctors manually via MongoDB Compass or
// create a seed script (explained at the bottom).
// ─────────────────────────────────────────────────────────
const doctorSchema = new mongoose.Schema({
  name:      { type: String, required: true },  // "Dr. Evelyn Reed"
  specialty: { type: String, required: true },  // "Cardiologist"
  rating:    { type: Number, default: 5.0  },   // 4.9
  reviews:   { type: Number, default: 0    },   // 128
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);