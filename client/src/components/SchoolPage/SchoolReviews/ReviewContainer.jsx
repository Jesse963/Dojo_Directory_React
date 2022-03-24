import React, { useState, useEffect } from "react";
import "./ReviewContainer.css";
import ReviewElement from "./ReviewElement";

function ReviewContainer(props) {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    console.log(reviews.length);
    if (reviews.length === 0) {
      getReviews();
    }
  }, []);

  const getReviews = async () => {
    const response = await fetch(
      "/api/getReviews?school_id=" + props.school_id
    );
    const tempReviews = await response.json();
    setReviews(tempReviews.reviews);
  };

  return (
    <div id="reviewContainer">
      <div id="reviewContent">{/* {this.state.reviews.mas */}</div>
      {reviews.map((review, i) => {
        return <ReviewElement review={review} key={i} />;
      })}
    </div>
  );
}

export default ReviewContainer;
