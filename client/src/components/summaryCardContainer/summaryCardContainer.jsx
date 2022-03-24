import React, { Component } from "react";
import SchoolSummary from "../schoolSummary/schoolSummary";
import "./summaryCardContainer.css";

const emptyArray = [];

class SummaryCardContainer extends React.Component {
  render() {
    return (
      <div className="main container">
        <div className="card container">
          {this.props.schools.map((dojo, i) => {
            console.log(this.props, dojo);
            return (
              <SchoolSummary
                dojo={dojo.school}
                score={dojo.score}
                history={this.props.schools}
                key={i}
                id={i}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default SummaryCardContainer;
