const Doctor      = require("../models/Doctor");
const Slot        = require("../models/Slot");
const Appointment = require("../models/Appointment");
const jwt         = require("jsonwebtoken");

// ─────────────────────────────────────────────────────────
// HELPER: Extract logged-in user ID from JWT token
// The frontend sends the token in the Authorization header
// as:  "Bearer eyJhbGci..."
// We decode it to get the user's _id
// ─────────────────────────────────────────────────────────
const getUserId = (req) => {
  const auth  = req.headers.authorization || "";
  const token = auth.replace("Bearer ", "");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.id;
};

// ─────────────────────────────────────────────────────────
// 1. GET ALL DOCTORS
// Route:    GET /api/users/doctors
// Auth:     Required (token in header)
// Response: Array of all doctors
// ─────────────────────────────────────────────────────────
exports.getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find(); // get all doctors from DB
    res.json(doctors);
  } catch (err) {
    console.error("getDoctors error:", err.message);
    res.status(500).json({ message: "Failed to fetch doctors" });
  }
};

// ─────────────────────────────────────────────────────────
// 2. GET AVAILABLE SLOTS
// Route:    GET /api/users/slots?doctorId=xxx&date=2024-12-05
// Auth:     Required
// Logic:    Find all slots for this doctor on this date
//           Return them with booked=true/false
// ─────────────────────────────────────────────────────────
exports.getSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    // Validate required query params
    if (!doctorId || !date) {
      return res.status(400).json({ message: "doctorId and date are required" });
    }

    // Find slots for this doctor+date, sorted by time
    const slots = await Slot.find({ doctor: doctorId, date }).sort({ time: 1 });
    res.json(slots);

  } catch (err) {
    console.error("getSlots error:", err.message);
    res.status(500).json({ message: "Failed to fetch slots" });
  }
};

// ─────────────────────────────────────────────────────────
// 3. BOOK AN APPOINTMENT
// Route:    POST /api/users/appointments/book
// Auth:     Required
// Body:     { doctorId, slotId, date, time }
// Logic:
//   Step 1 — Check if slot exists and is not already booked
//   Step 2 — Mark the slot as booked (booked: true)
//   Step 3 — Create a new Appointment record
//   Step 4 — Return success message
// ─────────────────────────────────────────────────────────
exports.bookAppointment = async (req, res) => {
  try {
    const patientId = getUserId(req);   // from JWT token
    const { doctorId, slotId, date, time } = req.body;

    // ── Step 1: Find the slot ────────────────────────────
    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }

    // ── Step 2: Check if already booked (clash prevention)
    if (slot.booked) {
      return res.status(400).json({ message: "This slot is already booked. Please choose another time." });
    }

    // ── Step 3: Mark slot as booked ─────────────────────
    slot.booked = true;
    await slot.save();

    // ── Step 4: Create the Appointment ──────────────────
    const appointment = await Appointment.create({
      patient: patientId,
      doctor:  doctorId,
      slot:    slotId,
      date,
      time,
      status:  "confirmed",
    });

    res.status(201).json({ message: "Appointment booked successfully", appointment });

  } catch (err) {
    console.error("bookAppointment error:", err.message);
    res.status(500).json({ message: "Booking failed. Please try again." });
  }
};

// ─────────────────────────────────────────────────────────
// 4. GET UPCOMING APPOINTMENTS (for Appointments screen)
// Route:    GET /api/users/appointments/upcoming
// Auth:     Required
// Logic:    Find all future appointments for logged-in user
// ─────────────────────────────────────────────────────────
exports.getUpcoming = async (req, res) => {
  try {
    const patientId = getUserId(req);
    const today = new Date().toISOString().split("T")[0]; // "2024-12-05"

    const appointments = await Appointment.find({
      patient: patientId,
      date:    { $gte: today },           // date >= today
      status:  { $in: ["confirmed", "pending"] },
    })
    .populate("doctor", "name specialty") // attach doctor name+specialty
    .sort({ date: 1, time: 1 });          // soonest first

    res.json(appointments);
  } catch (err) {
    console.error("getUpcoming error:", err.message);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

// ─────────────────────────────────────────────────────────
// 5. GET PAST APPOINTMENTS (for Appointments screen)
// Route:    GET /api/users/appointments/history
// Auth:     Required
// ─────────────────────────────────────────────────────────
exports.getHistory = async (req, res) => {
  try {
    const patientId = getUserId(req);
    const today = new Date().toISOString().split("T")[0];

    const appointments = await Appointment.find({
      patient: patientId,
      date:    { $lt: today },   // date < today = past
    })
    .populate("doctor", "name specialty")
    .sort({ date: -1 });         // most recent first

    res.json(appointments);
  } catch (err) {
    console.error("getHistory error:", err.message);
    res.status(500).json({ message: "Failed to fetch history" });
  }
};