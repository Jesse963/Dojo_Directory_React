import React, { Component } from "react";
import "./ReviewElement.css";

class ReviewElement extends React.Component {
  formatDate(dateTimeObject) {
    const date = new Date(dateTimeObject);
    const d = [
      date.getDate().toString(),
      (date.getMonth() + 1).toString(),
      date.getYear().toString(),
    ];
    if (d[1].length == 1) {
      console.log(d[1]);
      d[1] = "0" + d[1];
    }
    if (d[2].length > 2) {
      d[2] = d[2].slice(-2);
    }
    console.log(date);
    return d.join("/");
  }

  render() {
    const { first_name, last_name, email, createdAt, review } =
      this.props.review;
    return (
      <div id="reviewRoot">
        <div id="reviewFooter">
          <h5 id="author">{first_name + " " + last_name}</h5>
        </div>
        <div id="reviewFooter">
          <h6>(Student)</h6>
          <h6 id="date">{this.formatDate(createdAt)}</h6>
        </div>
        <p id="reviewContent">{review}</p>
      </div>
    );
  }
}

export default ReviewElement;
