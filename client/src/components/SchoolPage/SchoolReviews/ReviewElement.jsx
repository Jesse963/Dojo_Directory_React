import React, { Component } from "react";
import "./ReviewElement.css";

class ReviewElement extends React.Component {
  render() {
    return (
      <div id="reviewRoot">
        <p id="reviewContent">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <div id="reviewFooter">
          <h5 id="author">Jesse Jenkins</h5>
        </div>
        <div id="reviewFooter">
          <h6>(Student)</h6>
          <h6 id="date">14/09/2021</h6>
        </div>
      </div>
    );
  }
}

export default ReviewElement;
