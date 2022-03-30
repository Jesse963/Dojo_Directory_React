import React, { useState, Component } from "react";
import ReactDOM from "react-dom";
import Footer from "../footer/footer";
import NavBar from "../navbar/navbar";
import TagContainer from "../Tagging/TagContainer";

function NewSchoolForm() {
  const formIsValid = async (email, form) => {
    if (!form.checkValidity()) return false;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email }),
    };

    const response = await fetch("/api/checkEmailExists", options);
    const emailAvailable = await response.json();

    if (!emailAvailable) {
      window.alert("This email is already registered to an account");
    }

    return emailAvailable;
  };

  const collectFormAndRenderTags = async (e) => {
    //Add form validation function
    e.preventDefault();
    let formJSON = {};
    //Create JSON object of form data
    const newStudentForm = document.getElementById("newSchoolForm");
    const formData = new FormData(newStudentForm);
    formData.forEach((value, key) => {
      formJSON[key] = value;
    });
    if (!(await formIsValid(formJSON.email, newStudentForm))) {
      return console.log("whats doin");
    }
    ReactDOM.render(
      <React.Fragment>
        <TagContainer newSchoolData={formJSON} submissionMethod="newSchool" />
      </React.Fragment>,
      document.getElementById("mainContentContainer")
    );
  };

  return (
    // <div className="main container">
    <form className="new school form" id="newSchoolForm">
      <h2>Enter your details below!</h2>
      <p className="intro text">
        Fill in the form below and your school will be added to our database and
        suggested to hundreds of potential students!
      </p>
      <label htmlFor="school_name">Name of School</label>
      <input name="school_name" type="text" required />

      <label htmlFor="email">Email</label>
      <input name="email" type="email" required />

      <label htmlFor="first_name">First Name</label>
      <input name="first_name" type="text" required />

      <label htmlFor="last_name">Last Name</label>
      <input name="last_name" type="text" required />

      <label htmlFor="street">Street</label>
      <input type="street" id="autocomplete" name="street" required />

      <label htmlFor="city">City</label>
      <input type="city" id="inputCity" name="city" required />

      <div className="state wrapper">
        <label htmlFor="state">State</label>
        <input type="state" id="inputState" name="state" required />

        <label htmlFor="postcode">Postcode</label>
        <input
          type="number"
          id="inputPostcode"
          name="postcode"
          minLength={4}
          maxLength={4}
          required
        />
      </div>

      <label htmlFor="phone">Phone (Optional)</label>
      <input name="phone" type="number" />

      <label htmlFor="password">Password</label>
      <input name="password" type="password" required minLength="8" />
      <div className="controls">
        <button type="submit" onClick={(e) => collectFormAndRenderTags(e)}>
          Submit
        </button>
        <button onClick={() => (window.location.href = "/")}>Cancel</button>
      </div>
    </form>
    // </div>
  );
}

export default NewSchoolForm;
