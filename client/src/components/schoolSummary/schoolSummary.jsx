import React, { Component } from "react";
import "./schoolSummary.css";

class SchoolSummary extends React.Component {
  render() {
    return (
      <div
        id="schoolSummaryRoot"
        onClick={() => {
          console.log(`${this.props.dojo.name} was clicked`);
        }}
      >
        <h2 id="name">{this.props.dojo.name || "no ID"}</h2>
        <div id="description">{this.props.dojo.description}</div>
        <button className="btn btn-lg btn-primary">test</button>
      </div>
    );
  }
}

export default SchoolSummary;
