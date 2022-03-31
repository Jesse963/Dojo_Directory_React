import React, { Component } from "react";
import SchoolSummary from "../schoolSummary/schoolSummary";
import "./summaryCardContainer.css";

function SummaryCardContainer(props) {
  // ----- EMAIL RESULTS HANDLER ----- //
  const emailResultsHandler = async () => {
    const { schools } = props;
    const email = document.getElementById("emailToSendResults").value;
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ schools, email }),
    };

    const response = await fetch("/api/emailResultsToUser", options);
  };

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
      <div id="schoolSummaryToolbar">
        <button
          onClick={() =>
            document.getElementById("emailResultsDialog").showModal()
          }
        >
          Email my Results
        </button>
        <button>Back</button>
      </div>

      {/* Email form */}
      <dialog id="emailResultsDialog">
        <form
          id="emailResultsForm"
          method="javascript:void(0)"
          onSubmit={async (e) => {
            e.preventDefault();
            emailResultsHandler();
          }}
        >
          <h2>Enter your email address</h2>
          <label htmlFor="email">Email</label>
          <input name="email" type="email" id="emailToSendResults" required />
          <button type="submit">Submit</button>
          <button
            type="cancel"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("emailResultsDialog").close();
            }}
          >
            Cancel
          </button>
        </form>
      </dialog>
    </div>
  );
}

export default SummaryCardContainer;
