const Dojo = require("../models/dojos");
const router = require("../routes/api");
const bcrypt = require("bcrypt");
const axios = require("axios").default;
require("dotenv").config();

exports.test = async (req, res) => {
  const { coordinates, maxDistance = 10000 } = req.body;
  const response = await Dojo.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: coordinates,
        },
        $maxDistance: maxDistance,
      },
    },
  });
  console.log(response.map((dojo) => dojo.location.coordinates));
  return res.json(response);
};
