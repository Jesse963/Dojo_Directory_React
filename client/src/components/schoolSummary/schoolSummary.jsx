import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./schoolSummary.css";
import SchoolPageRoot from "../SchoolPage/SchoolPageRoot";
import NavBar from "../navbar/navbar";

function SchoolSummary(props) {
  const schoolClickHandler = () => {
    console.log(`${props.dojo.name} was clicked`);
    ReactDOM.render(
      <React.Fragment>
        <NavBar />
        <SchoolPageRoot dojo={props.dojo} history={props.history} />
      </React.Fragment>,
      document.querySelector("#root")
    );
  };
  const { dojo } = props;
  return (
    <div
      id="schoolSummaryRoot"
      className={`suggestion rank${props.id}`}
      onClick={() => {
        schoolClickHandler();
      }}
    >
      <h2 id="name">{dojo.name || "no ID"}</h2>
      <p id="schoolScore">School Score: {props.score}</p>
      <div className="school summary content">
        <p id="description">{dojo.description}</p>
        <div className="school details">
          <p className="contact element">{`Contact | ${dojo.sensei}`}</p>
          <p>
            <a href="tel:0415927738" className="contact element">{`Phone | ${
              dojo.phone || "0415 927 738"
            }`}</a>
          </p>
          <p>
            <a
              href="mailto:jesse-jenkins@hotmail.com"
              className="contact element"
            >{`Email | ${dojo.email}`}</a>
          </p>
          <p className="contact element">{`Address | ${dojo.address}`}</p>
        </div>
      </div>
    </div>
  );
}

export default SchoolSummary;
