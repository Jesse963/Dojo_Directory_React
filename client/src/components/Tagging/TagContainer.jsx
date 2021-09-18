import React, { Component } from "react";
import IndividualTag from "./IndividualTag";
import "./TagContainer.css";

const tags = [
  "Striking",
  "Grappling",
  "Ground Fighting",
  "Kicking",
  "Throwing",
  "Weapons",
  "Traditional",
  "Modern",
  "Self-Defense",
  "Competition",
  "Something else",
  "Eggs",
  "Small Classes",
  "Large Classes",
  "Beginner Friendly",
  "Professional Fighting",
  "Full Contact",
  "Good for kids",
  "Adults only classes",
  "Free Trial Available",
];
class TagContainer extends React.Component {
  clickHandler() {
    console.log("hello");
  }

  resetTags() {
    const tags = document.querySelectorAll(".tag.button");
    tags.forEach((tag) => {
      tag.classList.remove("btn-primary");
      tag.classList.remove("selected");
      tag.classList.add("btn-outline-primary");
    });
  }

  submissionHandler = async () => {
    const tags = document.querySelectorAll(".tag.button.selected");
    const tagsArray = Array.prototype.slice.call(tags);
    tagsArray.map((tag, i) => {
      tagsArray[i] = tag.textContent;
    });

    switch (this.props.submissionMethod) {
      //New school case = append tags to new school data, post to db
      case "newSchool":
        const { newSchoolData } = this.props;
        newSchoolData.tags = tagsArray;
        console.log("using new school method");
        console.log(newSchoolData);

        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newSchoolData),
        };

        const response = await fetch("/api/addNewSchool", options);
        const message = await response.json();
        if (response.status !== 200) {
          console.log(message.result);
        } else {
          console.log("should be going home");
          window.location.reload();
        }
    }
  };

  render() {
    return (
      <div id="tagsContainer">
        <h1>Select Some Tags</h1>
        <div className="tags">
          {tags.map((tag, i) => {
            return (
              <IndividualTag
                clickHandler={() => this.clickHandler()}
                id={i}
                key={i}
                tag={tag}
              />
            );
          })}
        </div>
        <div className="tags footer">
          <button
            className="btn btn-secondary btn-lg m-2"
            onClick={() => this.submissionHandler()}
          >
            Submit
          </button>
          <button
            className="btn btn-secondary btn-lg m-2"
            onClick={() => this.resetTags()}
          >
            Reset
          </button>
          <button
            className="btn btn-secondary btn-lg m-2"
            onClick={() => (window.location.href = "/")}
          >
            Home
          </button>
        </div>
      </div>
    );
  }
}

export default TagContainer;
