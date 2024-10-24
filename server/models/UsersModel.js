// userModel.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bookings: { type: Array, required: false}
});

const User = mongoose.model("Users", userSchema);

module.exports = User;
