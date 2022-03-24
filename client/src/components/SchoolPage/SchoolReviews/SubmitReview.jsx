import React, { Component } from "react";
import "./SubmitReview.css";

function SubmitReviewForm(props) {
  return (
    <dialog id="reviewFormDialog">
      <form
        id="reviewForm"
        method="POST"
        action={"/api/submitReview?school_id=" + props.school_id}
      >
        <h4>Submit a Review</h4>
        <label htmlFor="email">Email</label>
        <input name="email" type="email" required="true" />
        <label htmlFor="first_name">First Name</label>
        <input name="first_name" type="text" required="true" />
        <label htmlFor="last_name">Last Name</label>
        <input name="last_name" type="text" required="true" />
        <label htmlFor="review">Review</label>
        <textarea name="review" required="true" />
        <button type="submit">Submit</button>
      </form>
    </dialog>
  );
}

export default SubmitReviewForm;
