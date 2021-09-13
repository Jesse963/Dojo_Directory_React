import React, { Component } from "react";
import "./SchoolPageContent.css";

class SchoolPageContent extends React.Component {
  render() {
    return (
      <div id="mainContent">
        <h2>About Us |</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h2>Contact |</h2>
        <p>XXXX XXX XXX</p>
        <p> fake_email@gmail.com</p>
        <p>101 Some Street, Sydney, 2000</p>
        <h2>Reviews |</h2>
        <p>To Do: Create separate react component for reviews</p>
      </div>
    );
  }
}

export default SchoolPageContent;
