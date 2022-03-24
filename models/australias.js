const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let PostcodeSchema = new Schema({
  postcode: {
    type: String,
    required: Number,
  },
  suburb: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
  },
  lon: {
    type: Number,
  },
});

const Location = mongoose.model("australias", PostcodeSchema, "australias");
module.exports = Location;
