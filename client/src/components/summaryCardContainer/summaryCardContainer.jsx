import React, { Component } from "react";
import SchoolSummary from "../schoolSummary/schoolSummary";
import "./summaryCardContainer.css";

function SummaryCardContainer(props) {
  return (
    <div className="card container">
      {props.schools.map((dojo, i) => {
        console.log(props, dojo);
        return (
          <SchoolSummary
            dojo={dojo.school}
            score={dojo.score}
            distance={dojo.distance}
            history={props.schools}
            key={i}
            id={i}
          />
        );
      })}
    </div>
  );
}

export default SummaryCardContainer;
