const express = require("express");
const router = express.Router();

const {
  retrieveAllDBEntries,
  addNewSchool,
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

//Dojo routes
router.get("/getAll", retrieveAllDBEntries);
router.post("/addNewSchool", addNewSchool);

//Review routes
router.post("/submitReview", submitReview);
router.get("/getReviews", getReviews);

//Tag routes
router.get("/getTags", getTags);
router.post("/submitTagsArray", submitTagsArray);
router.post("/generateScores", generateScores);

module.exports = router;
