const router = require("express").Router();

// Import controllers
const { register, login }  = require("../controllers/userController");
const {
  getDoctors,
  getSlots,
  bookAppointment,
  getUpcoming,
  getHistory,
} = require("../controllers/appointmentController");

// ── Auth middleware (verifies JWT token) ─────────────────
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    const auth  = req.headers.authorization || "";
    const token = auth.replace("Bearer ", "");
    if (!token) return res.status(401).json({ message: "No token. Please log in." });
    jwt.verify(token, process.env.JWT_SECRET); // throws if invalid
    next(); // token valid, proceed
  } catch {
    res.status(401).json({ message: "Invalid token. Please log in again." });
  }
};

// ── Public routes (no token needed) ─────────────────────
router.post("/register", register);
router.post("/login",    login);

// ── Protected routes (token required) ───────────────────
router.get("/doctors",                   protect, getDoctors);
router.get("/slots",                     protect, getSlots);
router.post("/appointments/book",        protect, bookAppointment);
router.get("/appointments/upcoming",     protect, getUpcoming);
router.get("/appointments/history",      protect, getHistory);

module.exports = router;


// GET /appointments/:id  — return a single appointment
router.get("/appointments/:id", protect, async (req, res) => {
  const Appointment = require("../models/Appointment");
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("doctor", "name specialty")   // include doctor's info
      .populate("slot");                      // optional if you want slot details
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    res.json({
      _id: appointment._id,
      doctorName: appointment.doctor.name,
      specialty: appointment.doctor.specialty,
      date: appointment.date,
      time: appointment.time,
      location: "123 Health Clinic",  // you can make this dynamic later
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});