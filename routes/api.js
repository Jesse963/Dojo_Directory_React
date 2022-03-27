const express = require("express");
const router = express.Router();

const {
  retrieveAllDBEntries,
  addNewSchool,
  searchByName,
  checkEmailExists,
  populateTestData,
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
const { test } = require("../controllers/testController");
const { postcodeToCoordinates } = require("../controllers/locationController");

//Dojo routes
router.get("/getAll", retrieveAllDBEntries);
router.get("/populateTestData", populateTestData);
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

//Location Routes
router.post("/postcodeToCoords", postcodeToCoordinates);

//Test route
router.post("/test", test);

module.exports = router;
