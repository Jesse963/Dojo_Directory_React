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
    street: {
      type: String,
    },
    postcode: {
      type: Number,
      required: true,
    },
    state: {
      type: String,
    },
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: {
        type: [Number],
      },
    },
    email: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    phone: {
      type: Number,
      default: "",
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
    valid: {
      type: Boolean,
      default: false,
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
DojoSchema.index({ location: "2dsphere" });
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
