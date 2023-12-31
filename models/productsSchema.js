const mongoose = require("mongoose");
const validator = require("validator");

// Create a schema for the user model. This will define what fields are required and their data types, as well as any validation rules we want to apply on them

const productsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  composition: { type: String, required: true },
  company: { type: String, required: true },
  packing: { type: String, required: true },
  requireprescription: { type: Boolean, required: true },
  mrp: { type: String, required: true },
  price: { type: String, required: true },
  batch: [
    {
      batchNumber: { type: String, required: false },
      quantity: { type: Number, required: true },
    },
  ],
  datecreated: Date,
  dateUpdated: Date,
});

// model define

const products = new mongoose.model("products", productsSchema);

module.exports = products;
