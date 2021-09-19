import React, { Component } from "react";
import ReactDOM from "react-dom";
import IndividualTag from "./IndividualTag";
import "./TagContainer.css";
import Navbar from "../navbar/navbar";
import SummaryCardContainer from "../summaryCardContainer/summaryCardContainer";

let tags = [];

class TagContainer extends React.Component {
  componentDidMount() {
    this.getTags();
  }

  getTags = async () => {
    const response = await fetch("/api/getTags");
    tags = (await response.json()).tags;
    await this.setState({ tags: tags });
    console.log(tags);
  };

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
    const tagsArray = Array.from(tags);
    tagsArray.map((tag, i) => {
      tagsArray[i] = tag.textContent;
    });
    console.log(tagsArray);

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
      case "comparison":
        const options_comparison = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userTags: tagsArray }),
        };
        // console.log(options_comparison.body);
        const res_comp = await fetch("/api/generateScores", options_comparison);
        const message_comp = await res_comp.json();
        console.log(message_comp);
        if (res_comp.status !== 200) {
          console.log(message_comp);
        } else {
          console.log("rendering suggestions");
          ReactDOM.render(
            <React.Fragment>
              <Navbar />
              <SummaryCardContainer schools={message_comp} />
            </React.Fragment>,
            document.getElementById("root")
          );
          // window.location.reload();
        }
    }
  };

  render() {
    return (
      <div id="tagsContainer">
        <h1>Select Some Tags</h1>
        <div className="tags">
          {tags.map((tag, i) => {
            return <IndividualTag id={i} _id={tag._id} key={i} tag={tag.tag} />;
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
