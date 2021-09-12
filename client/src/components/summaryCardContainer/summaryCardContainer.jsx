import React, { Component } from "react";
import SchoolSummary from "../schoolSummary/schoolSummary";
import "./summaryCardContainer.css";

class SummaryCardContainer extends React.Component {
  render() {
    return (
      <div id="cardContainer">
        {this.props.schools.map((dojo, i) => {
          console.log(dojo.name);
          return <SchoolSummary dojo={dojo} key={i} />;
        })}
      </div>
    );
  }
}

export default SummaryCardContainer;
