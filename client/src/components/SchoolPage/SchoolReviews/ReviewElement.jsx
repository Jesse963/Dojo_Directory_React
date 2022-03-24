import React, { Component } from "react";

function ReviewElement(props) {
  const formatDate = (dateTimeObject) => {
    const date = new Date(dateTimeObject);
    const d = [
      date.getDate().toString(),
      (date.getMonth() + 1).toString(),
      date.getYear().toString(),
    ];
    if (d[1].length == 1) {
      d[1] = "0" + d[1];
    }
    if (d[2].length > 2) {
      d[2] = d[2].slice(-2);
    }
    return d.join("/");
  };

  const { first_name, last_name, email, createdAt, review } = props.review;
  return (
    <div className="review element">
      <div className="review header">
        <p id="author">{first_name + " " + last_name}</p>
        <p id="date">{formatDate(createdAt)}</p>
      </div>
      <p className="review content">{review}</p>
    </div>
  );
}

export default ReviewElement;
