const mongoose = require("mongoose");
const validator = require("validator");

// Create a schema for the user model. This will define what fields are required and their data types, as well as any validation rules we want to apply on them

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: String, required: true },
});

// model define

const firebaseusers = new mongoose.model("firebaseusers", userSchema);

module.exports = firebaseusers;
