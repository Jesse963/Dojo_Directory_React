const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ReviewSchema = new Schema(
  {
    school_id: {
      type: String,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
  }
);

const Reviews = mongoose.model("reviews", ReviewSchema);
module.exports = Reviews;
