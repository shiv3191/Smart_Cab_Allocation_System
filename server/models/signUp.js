// signUp.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:{type: String, default:'client'}
});

const signUp = mongoose.model("User", userSchema);

module.exports = signUp;
