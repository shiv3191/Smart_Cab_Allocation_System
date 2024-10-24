const mongoose = require("mongoose");

// Schema for Bus
const CabSchema = new mongoose.Schema({
  CabName: { type: String, required: true },
  totalSeats: { type: Number, required: true },
  currentOccupancy: { type: Number, default: 0 },
  availableDays: { type: [String], default: true },
  route: {
    origin: { type: String, required: true },
    destination: { type: String, default: true },
  },
  seatPlan: {
    type: [
      {
        Number: { type: String, default: true },
        design: { type: String,default: true },
        isBooked: { type: Boolean, default: false },
      },
    ],
    default: [],
  },
});

// Model for Bus
const Cab = mongoose.model("buses", CabSchema);

module.exports = Cab;
