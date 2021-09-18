const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

let DojoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    sensei: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      unique: true,
    },
    postcode: {
      type: Number,
    },
    state: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: ``,
    },
    password: {
      type: String,
      required: true,
    },
    tags: {
      type: Array,
      default: [],
    },
    reviews: {
      type: Array,
      default: [],
    },
    timetables: {
      type: Array,
      default: [],
    },
    profileImage: {
      type: String,
    },
    bannerImage: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "createdAt",
      updatedAt: "updatedAt",
    },
    // collection: "users",
  }
);

const Dojo = mongoose.model("dojos", DojoSchema);
module.exports = Dojo;

module.exports.hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error(error);
  }
};

// module.exports.comparePasswords = async (inputPassword, hashedPassword) => {
//   try {
//     return await bcrypt.compare(inputPassword, hashedPassword);
//   } catch (error) {
//     throw new Error("Comparison failed", error);
//   }
// };
