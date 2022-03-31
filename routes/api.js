const express = require("express");
const router = express.Router();

const {
  retrieveAllDBEntries,
  addNewSchool,
  searchByName,
  checkEmailExists,
  populateTestData,
  updateSchool,
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
const {
  login,
  logout,
  retrieveLoggedInSchool,
} = require("../controllers/loginController");
const { emailResultsToUser } = require("../controllers/emailController");

//Dojo routes
router.get("/getAll", retrieveAllDBEntries);
router.get("/populateTestData", populateTestData);
router.post("/addNewSchool", addNewSchool);
router.post("/searchSchools", searchByName);
router.post("/checkEmailExists", checkEmailExists);
router.post("/updateSchool", updateSchool);

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

//Login routes
router.post("/login", login);
router.get("/logout", logout);
router.get("/retrieveLoggedInSchool", retrieveLoggedInSchool);

// Email Routes
router.post("/emailResultsToUser", emailResultsToUser);

module.exports = router;
