import ReactDOM from "react-dom";
import React from "react";
import SchoolPageRoot from "../SchoolPageRoot";

function EditSchoolForm(props) {
  const submitHandler = async () => {
    console.log("submitting");
    const inputs = Array.from(
      document.querySelectorAll(
        "#editContentForm textarea, #editContentForm input"
      )
    );
    let update = {};
    inputs.map((input) => (update[input.name] = input.value));
    console.log("update:", update);

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
    console.log("Successfully updated", message.school);
    props.setSchool(message.school);
    document.getElementById("editContentDialog").close();

    ReactDOM.render(
      <React.Fragment>
        <SchoolPageRoot dojo={message.school} loggedIn={true} />
      </React.Fragment>,
      document.getElementById("mainContentContainer")
    );
  };

  /*  -----  EDIT CONTENT DIALOG  -----  */
  return (
    <dialog id="editContentDialog">
      <form id="editContentForm" method="POST" action={"/api/updateSchool?"}>
        <h4>Edit your details</h4>
        {/* <label htmlFor="email">Email</label>
   <input name="email" type="email" required />
   <label htmlFor="last_name">Last Name</label>
   <input name="last_name" type="text" required />
<label htmlFor="about">About Us</label> */}

        <label htmlFor="name">Name</label>
        <input
          name="name"
          type="text"
          required
          defaultValue={props.school.name}
        />
        <textarea
          name="description"
          required
          defaultValue={props.school.description}
        />
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
