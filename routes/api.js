const express = require("express");
const router = express.Router();

const { retrieveAllDBEntries } = require("../controllers/dojosController");
const {
  submitReview,
  getReviews,
} = require("../controllers/reviewsController.js");

router.get("/getAll", retrieveAllDBEntries);
router.post("/submitReview", submitReview);
router.get("/getReviews", getReviews);

module.exports = router;
