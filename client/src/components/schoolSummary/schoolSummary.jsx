import React, { Component } from "react";
import "./schoolSummary.css";

class SchoolSummary extends React.Component {
  render() {
    const dojo = this.props.dojo;
    return (
      <div
        id="schoolSummaryRoot"
        className={`suggestion rank${this.props.id}`}
        onClick={() => {
          console.log(`${dojo.name} was clicked`);
        }}
      >
        <h2 id="name">{dojo.name || "no ID"}</h2>
        <div className="school summary content">
          <div id="description">{dojo.description}</div>
          <div id="schoolDetails">
            <p className="contact element">{`Contact | ${dojo.sensei}`}</p>
            <p className="contact element">{`Phone | ${
              dojo.phone || "0415 927 738"
            }`}</p>
            <p className="contact element">{`Email | ${dojo.email}`}</p>
            <p className="contact element">{`Address | ${dojo.address}`}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default SchoolSummary;
