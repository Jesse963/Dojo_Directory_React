import ReactDOM from "react-dom";
import React from "react";
import SchoolPageRoot from "../SchoolPageRoot";

function EditSchoolForm(props) {
  const submitHandler = async () => {
    const formValid = document
      .getElementById("editContentForm")
      .checkValidity();
    if (!formValid) return console.log("Form not valid");
    console.log("submitting");
    const inputs = Array.from(
      document.querySelectorAll(
        "#editContentForm textarea, #editContentForm input"
      )
    );
    let update = {};
    inputs.map((input) => (update[input.name] = input.value));

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    };

    // return console.log(options);
    const response = await fetch("/api/updateSchool", options);
    const message = await response.json();
    if (!message.success)
      return window.alert("Unable to update school, " + message.error);
    console.log("Successfully updated", message);
    props.setSchool(message.school);
    document.getElementById("editContentDialog").close();

    ReactDOM.render(
      <React.Fragment>
        <SchoolPageRoot dojo={message.school} loggedIn={true} />
      </React.Fragment>,
      document.getElementById("mainContentContainer")
    );
  };
  console.log(props.school);
  /*  -----  EDIT CONTENT DIALOG  -----  */
  if (!props.school) return null;
  return (
    <dialog id="editContentDialog">
      <form id="editContentForm" method="POST" action={"/api/updateSchool?"}>
        <h4 id="editContentHeading">Edit your details</h4>

        <label htmlFor="phone">Phone</label>
        <input
          name="phone"
          type="tel"
          defaultValue={props.school.phone || ""}
        />
        <label htmlFor="website">Website</label>
        <input name="website" type="url" defaultValue={props.school.website} />

        <label htmlFor="description">Description</label>
        <textarea name="description" defaultValue={props.school.description} />
        <div className="controls">
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              submitHandler();
            }}
          >
            Submit
          </button>
          <button
            type="cancel"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("editContentDialog").close();
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
}
export default EditSchoolForm;
