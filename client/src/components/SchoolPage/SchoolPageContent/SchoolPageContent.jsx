import React, { useState } from "react";
import ReviewContainer from "../SchoolReviews/ReviewContainer";
import ReactDOM from "react-dom";
import NavBar from "../../navbar/navbar";
import SummaryCardContainer from "../../summaryCardContainer/summaryCardContainer";

function SchoolPageContent(props) {
  const [content, setContent] = useState("about");
  console.log(content);
  const backToSuggestionsHandler = () => {
    ReactDOM.render(
      <React.Fragment>
        <SummaryCardContainer schools={props.history} />
      </React.Fragment>,
      document.getElementById("mainContentContainer")
    );
  };

  const submitReviewButtonHandler = () => {
    const modal = document.getElementById("reviewFormDialog");
    console.log(modal);
    modal.showModal();
  };

  const closeModal = () => {
    const modal = document.getElementById("reviewFormDialog");
    modal.close();
  };

  const contentSwitch = () => {
    switch (content) {
      case "about":
        return (
          <div className="final content">
            <h3>About Us</h3>
            <div className="about container">
              <p id={"about"}>{dojo.description}</p>
              <div className="tags container">
                <h4>School Focuses</h4>
                <p>{dojo.tags.join(", ")}</p>
                <p>{dojo.tags.join(", ")}</p>
                <p>{dojo.tags.join(", ")}</p>
              </div>
            </div>
          </div>
        );
      case "contact":
        return (
          <div className="final content">
            <h3>Contact</h3>
            <a href={`tel:${dojo.phone}`}>{dojo.phone || "0000 000 000"}</a>
            <a href={`mailto:${dojo.email}`}>{dojo.email}</a>
            <a>{dojo.address}</a>
          </div>
        );
      case "reviews":
        return (
          <div className="final content">
            <h3>Reviews</h3>
            <ReviewContainer school_id={props.dojo._id} />
          </div>
        );
      default:
        return 0;
    }
  };

  const dojo = props.dojo;
  return (
    <div id="mainContent">
      <div className="content controls">
        <a onClick={() => setContent("about")}>About Us</a>
        <a onClick={() => setContent("reviews")}>Reviews</a>
        <a onClick={() => setContent("contact")}>Contact Info</a>
      </div>
      {contentSwitch()}
      <div className="content footer">
        <button
          onClick={() => {
            backToSuggestionsHandler();
          }}
        >
          Back to Suggestions
        </button>
        <button
          onClick={() => {
            submitReviewButtonHandler();
          }}
        >
          Submit a review
        </button>
      </div>

      {/* Submit review form dialog */}
      <dialog id="reviewFormDialog">
        <form
          id="reviewForm"
          method="POST"
          action={"/api/submitReview?school_id=" + props.dojo._id}
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
          <div className="controls">
            <button type="submit">Submit</button>
            <button
              type="cancel"
              onClick={(e) => {
                e.preventDefault();
                closeModal();
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </div>
  );
}

export default SchoolPageContent;
