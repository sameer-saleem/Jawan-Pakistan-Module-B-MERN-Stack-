const mongoose = require("mongoose");

// ─────────────────────────────────────────────────────────
// SLOT MODEL
// Each slot belongs to a doctor and represents one
// available time on a specific date.
// "booked: true" means someone already took that slot.
// ─────────────────────────────────────────────────────────
const slotSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",    // links to Doctor model
    required: true,
  },
  date: {
    type: String,     // stored as "2024-12-05" (easy to query)
    required: true,
  },
  time: {
    type: String,     // "09:00 AM"
    required: true,
  },
  period: {
    type: String,
    enum: ["Morning", "Afternoon"],  // used to group on frontend
    required: true,
  },
  booked: {
    type: Boolean,
    default: false,   // false = available, true = taken
  },
}, { timestamps: true });

module.exports = mongoose.model("Slot", slotSchema);