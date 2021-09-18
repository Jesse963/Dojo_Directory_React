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

//Dojo routes
router.get("/getAll", retrieveAllDBEntries);
router.post("/addNewSchool", addNewSchool);

//Review routes
router.post("/submitReview", submitReview);
router.get("/getReviews", getReviews);

module.exports = router;
