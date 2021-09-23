import React, { Component } from "react";
import "./SchoolPageContent.css";
import ReviewContainer from "../SchoolReviews/ReviewContainer";
import ReactDOM from "react-dom";
import NavBar from "../../navbar/navbar";
import SummaryCardContainer from "../../summaryCardContainer/summaryCardContainer";

class SchoolPageContent extends React.Component {
  backToSuggestionsHandler() {
    console.log("test");
    ReactDOM.render(
      <React.Fragment>
        <NavBar />
        <SummaryCardContainer schools={this.props.history} />
      </React.Fragment>,
      document.getElementById("root")
    );
  }
  render() {
    const dojo = this.props.dojo;
    return (
      <div id="mainContent">
        <h2>About Us |</h2>
        <p id={"about"}>{dojo.description}</p>
        <h2>Contact |</h2>
        <p>{dojo.phone}</p>
        <p>{dojo.email}</p>
        <p>{dojo.address}</p>
        <ReviewContainer school_id={this.props.dojo._id} />
        <button
          className="btn btn-danger mt-2"
          onClick={() => {
            this.backToSuggestionsHandler();
          }}
        >
          Back to Suggestions
        </button>
      </div>
    );
  }
}

export default SchoolPageContent;
