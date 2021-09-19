import React, { Component } from "react";
import ReactDOM from "react-dom";
import TagContainer from "../Tagging/TagContainer";

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
      <div id="newSchoolFormContainer">
        <form
          className="shadow-lg p-3 mb-5 bg-white rounded page container"
          id="newSchoolForm"
          style={{ marginTop: "10%" }}
        >
          <div
            style={{ paddingLeft: "5%", paddingRight: "5%", textAlign: "left" }}
          >
            <h1 style={{ textAlign: "center" }}>Welcome</h1>
            <p>
              Name of School:
              <input
                name="school_name"
                type="text"
                style={{ width: "100%" }}
                class="form-control"
                required="true"
              />
            </p>
            <p>
              Email:
              <input
                name="email"
                type="email"
                style={{ width: "100%" }}
                class="form-control"
                required="true"
              />
              <p style={{ color: "red" }}>{this.state.error}</p>
            </p>
            <p>
              First Name:
              <input
                name="first_name"
                type="text"
                style={{ width: "100%" }}
                class="form-control"
                required="true"
              />
            </p>
            <p>
              Last Name:
              <input
                name="last_name"
                type="text"
                style={{ width: "100%" }}
                class="form-control"
                required="true"
              />
            </p>
            <p>
              Phone (Optional):
              <input
                name="phone"
                type="tel"
                style={{ width: "100%" }}
                class="form-control"
              />
            </p>
            <p>
              Postcode (Optional):
              <input
                name="postcode"
                type="number"
                style={{ width: "100%" }}
                class="form-control"
              />
            </p>
            <p>
              Password:
              <input
                name="password"
                type="password"
                style={{ width: "100%" }}
                class="form-control"
                required="true"
                minLength="8"
                maxLength="30"
              />
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              className="btn btn-primary btn-lg m-2"
              style={{ width: "20%" }}
              onClick={(e) => this.collectFormAndRenderTags(e)}
            >
              Submit
            </button>
            <button
              className="btn btn-danger btn-lg m-2"
              style={{ width: "20%" }}
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