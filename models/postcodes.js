const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

let PostcodeSchema = new Schema({
  postcode: {
    type: Number,
    required: true,
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
    required: true,
  },
  lon: {
    type: Number,
    required: true,
  },
});

const PostCodes = mongoose.model("australia", PostcodeSchema);
module.exports = PostCodes;
