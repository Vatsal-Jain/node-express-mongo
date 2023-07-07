const mongoose = require("mongoose");
const validator = require("validator");

// Create a schema for the user model. This will define what fields are required and their data types, as well as any validation rules we want to apply on them

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw Error("not valid email");
      }
    },
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 10,
  },

  datecreated: Date,
  dateUpdated: Date,
});

// model define

const users = new mongoose.model("users", userSchema);

module.exports = users;
