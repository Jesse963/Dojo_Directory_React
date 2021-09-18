const Dojo = require("../models/dojos");
const router = require("../routes/api");
require("dotenv").config();

exports.retrieveAllDBEntries = async (req, res) => {
  const schools = await Dojo.find({});
  // console.log(schools);
  return res.json({ schools: schools });
};
