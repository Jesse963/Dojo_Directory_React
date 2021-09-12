import React, { Component } from "react";
import SchoolSummary from "../schoolSummary/schoolSummary";
import "./summaryCardContainer.css";

const emptyArray = ["", "", "", "", "", "", "", "", "", ""];

class SummaryCardContainer extends React.Component {
  render() {
    return (
      <div id="cardContainer">
        {/* {this.props.schools.map((dojo, i) => {
          console.log(dojo.name);
          return <SchoolSummary dojo={dojo} key={i} />;
        })} */}
        {emptyArray.map((dojo, i) => {
          console.log(this.props, dojo);
          return <SchoolSummary dojo={this.props.schools[0]} key={i} />;
        })}
      </div>
    );
  }
}

export default SummaryCardContainer;
