import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./ReviewContainer.css";
import ReviewElement from "./ReviewElement";
import SubmitReviewForm from "./SubmitReview";

let reviews = [];

class ReviewContainer extends React.Component {
  state = {
    reviews: [],
  };
  getReviews = async () => {
    const response = await fetch(
      "/api/getReviews?school_id=" + this.props.school_id
    );
    reviews = await response.json();
    this.setState(reviews);
  };

  submitReviewButtonHandler() {
    ReactDOM.render(
      <React.Fragment>
        <SubmitReviewForm school_id={this.props.school_id} />
      </React.Fragment>,
      document.querySelector("#reviewContainer")
    );
  }

  componentDidMount() {
    this.getReviews();
  }

  render() {
    return (
      <div id="reviewContainer">
        <h2>Reviews |</h2>
        <div id="reviewContent">{/* {this.state.reviews.mas */}</div>
        {this.state.reviews.map((review, i) => {
          console.log(review || "");
          return <ReviewElement review={review} key={i} />;
        })}
        <button
          className="btn btn-primary"
          onClick={() => this.submitReviewButtonHandler()}
        >
          Submit a review
        </button>
      </div>
    );
  }
}

export default ReviewContainer;
