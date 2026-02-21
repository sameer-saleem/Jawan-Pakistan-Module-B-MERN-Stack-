// ─────────────────────────────────────────────────────────
// SEED SCRIPT
// Run this ONCE to add doctors and slots to your database.
//
// HOW TO RUN:
//   node seed.js
//
// This adds 2 doctors + time slots for the next 7 days.
// ─────────────────────────────────────────────────────────
require("dotenv").config();
const mongoose   = require("mongoose");
const Doctor     = require("./models/Doctor");
const Slot       = require("./models/Slot");
const Appointment = require("./models/Appointment");

const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("Connected to MongoDB");

  // Clear ALL existing data so no stale references remain
  await Appointment.deleteMany({});
  await Slot.deleteMany({});
  await Doctor.deleteMany({});
  console.log("Cleared old doctors, slots, and appointments");

  // Create 2 doctors
  const doctors = await Doctor.insertMany([
    { name: "Dr. Evelyn Reed", specialty: "Cardiologist",  rating: 4.9, reviews: 128 },
    { name: "Dr. Marcus Chen", specialty: "Dermatologist", rating: 4.8, reviews: 97  },
  ]);
  console.log("Doctors created:", doctors.map(d => d.name));

  const slotTimes = [
    { time: "09:00 AM", period: "Morning"   },
    { time: "09:30 AM", period: "Morning"   },
    { time: "10:00 AM", period: "Morning"   },
    { time: "10:30 AM", period: "Morning"   },
    { time: "11:00 AM", period: "Morning"   },
    { time: "02:00 PM", period: "Afternoon" },
    { time: "02:30 PM", period: "Afternoon" },
    { time: "03:00 PM", period: "Afternoon" },
    { time: "03:30 PM", period: "Afternoon" },
    { time: "04:00 PM", period: "Afternoon" },
  ];

  // Generate slots for today + next 6 days (7 days total)
  const allSlots = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split("T")[0]; // "2025-02-21"

    for (const doctor of doctors) {
      for (const s of slotTimes) {
        allSlots.push({
          doctor: doctor._id,
          date:   dateStr,
          time:   s.time,
          period: s.period,
          booked: false,
        });
      }
    }
  }

  await Slot.insertMany(allSlots);
  console.log(`✅ Created ${allSlots.length} slots across 7 days for ${doctors.length} doctors`);

  console.log("\n✅ Seed complete! You can now test booking.");
  mongoose.disconnect();
};

run().catch(err => {
  console.error("Seed failed:", err.message);
  mongoose.disconnect();
});