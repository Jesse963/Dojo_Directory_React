import React, { Component } from "react";
import "./SubmitReview.css";

class SubmitReviewForm extends React.Component {
  render() {
    return (
      <div>
        <h2>Submit a Review |</h2>
        <form
          id="reviewForm"
          method="POST"
          action={"/api/submitReview?school_id=" + this.props.school_id}
        >
          <p>
            Email:
            <input
              name="email"
              type="email"
              style={{ width: "100%" }}
              class="form-control"
              required="true"
            />
          </p>
          <div id="formNameComponent">
            <p id="first_name">
              First Name:
              <input
                name="first_name"
                type="text"
                class="form-control"
                required="true"
              />
            </p>
            <p>
              Last Name:
              <input
                name="last_name"
                type="text"
                class="form-control"
                required="true"
              />
            </p>
          </div>
          <p id="reviewEntry">
            Review:
            <textarea name="review" class="form-control" required="true" />
          </p>
          <button
            type="submit"
            className="btn btn-primary btn-lg m-2"
            style={{ width: "20%" }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default SubmitReviewForm;
