const router = require("../routes/api");
const Review = require("../models/reviews");
require("dotenv").config();

exports.submitReview = async (req, res) => {
  const school_id = req.query.school_id;
  console.log(
    `Entered Submit Review for school: ${school_id} at ${new Date()}`
  );
  const { first_name, last_name, email, review } = req.body;

  try {
    const reviewSubmission = new Review({
      school_id: school_id,
      first_name: first_name,
      last_name: last_name,
      review: review,
      email: email,
    });
    await reviewSubmission.save();
  } catch (error) {
    return res.status(400).json({
      error: true,
      message: `Error adding new student to database: ${error}`,
    });
  }
  return res.location("/").status(302).json({ success: "True" });
};

exports.getReviews = async (req, res) => {
  const school_id = "606e38e7726a66549c3f732c";
  console.log("Getting reviews");
  const reviews = await Review.find({ school_id: school_id });
  return res.json({ reviews: reviews });
};
