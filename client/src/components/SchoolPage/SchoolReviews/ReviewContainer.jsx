import React, { Component } from "react";
import "./ReviewContainer.css";
import ReviewElement from "./ReviewElement";

const reviews = ["", "", "", "", ""];

class ReviewContainer extends React.Component {
  render() {
    return (
      <div id="reviewContainer">
        <h2>Reviews |</h2>
        <div id="reviewContent">
          {reviews.map((review) => {
            return <ReviewElement />;
          })}
        </div>
      </div>
    );
  }
}

export default ReviewContainer;
