import React, { Component } from "react";
import ReactDOM from "react-dom";
import TagContainer from "../Tagging/TagContainer";
import "./NewSchoolForm.css";

class NewSchoolForm extends Component {
  state = { error: "" };

  collectFormAndRenderTags = async (e) => {
    //Add form validation function
    e.preventDefault();
    let formJSON = {};
    //Create JSON object of form data
    const formData = new FormData(document.getElementById("newSchoolForm"));
    formData.forEach((value, key) => {
      formJSON[key] = value;
    });
    console.log(formJSON);

    ReactDOM.render(
      <TagContainer newSchoolData={formJSON} submissionMethod="newSchool" />,
      document.getElementById("newSchoolFormContainer")
    );
  };

  render() {
    return (
      <div className="main container">
        <form className="new school form" id="newSchoolForm">
          <h2>Enter your details below!</h2>
          <p className="intro text">
            Fill in the form below and your school will be added to our database
            and suggested to hundreds of potential students!
          </p>
          <label htmlFor="school_name">Name of School</label>
          <input
            name="school_name"
            type="text"
            class="form-control"
            required="true"
          />
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            class="form-control"
            required="true"
          />
          <label htmlFor="first_name">First Name</label>
          <input
            name="first_name"
            type="text"
            class="form-control"
            required="true"
          />
          <label htmlFor="last_name">Last Name</label>
          <input
            name="last_name"
            type="text"
            class="form-control"
            required="true"
          />
          <label htmlFor="phone">Phone (Optional)</label>
          <input name="phone" type="tel" class="form-control" />

          <label htmlFor="postcode">Postcode (Optional)</label>
          <input name="postcode" type="number" class="form-control" />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            class="form-control"
            required="true"
            minLength="8"
            maxLength="30"
          />
          <div className="controls">
            <button
              type="submit"
              className="btn btn-primary btn-lg m-2"
              onClick={(e) => this.collectFormAndRenderTags(e)}
            >
              Submit
            </button>
            <button
              className="btn btn-danger btn-lg m-2"
              onClick={() => (window.location.href = "/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default NewSchoolForm;
