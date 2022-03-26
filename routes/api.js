const express = require("express");
const router = express.Router();

const {
  retrieveAllDBEntries,
  addNewSchool,
  searchByName,
  checkEmailExists,
} = require("../controllers/dojosController");
const {
  submitReview,
  getReviews,
} = require("../controllers/reviewsController.js");
const {
  submitTagsArray,
  getTags,
  generateScores,
} = require("../controllers/tagsController");

const {
  retrieveLocations,
  postSuburb,
} = require("../controllers/geolocationTesting");

//Dojo routes
router.get("/getAll", retrieveAllDBEntries);
router.post("/addNewSchool", addNewSchool);
router.post("/searchSchools", searchByName);
router.post("/checkEmailExists", checkEmailExists);

//Review routes
router.post("/submitReview", submitReview);
router.get("/getReviews", getReviews);

//Tag routes
router.get("/getTags", getTags);
router.post("/submitTagsArray", submitTagsArray);
router.post("/generateScores", generateScores);

//Geolocation Testing
router.get("/getSuburbs", retrieveLocations);
router.post("/postSuburb", postSuburb);

module.exports = router;
