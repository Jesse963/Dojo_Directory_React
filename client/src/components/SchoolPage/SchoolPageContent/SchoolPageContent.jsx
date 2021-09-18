import React, { Component } from "react";
import "./SchoolPageContent.css";
import ReviewContainer from "../SchoolReviews/ReviewContainer";

class SchoolPageContent extends React.Component {
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
      </div>
    );
  }
}

export default SchoolPageContent;
