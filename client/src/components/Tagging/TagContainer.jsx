import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import IndividualTag from "./IndividualTag";
import "./TagContainer.css";
import Navbar from "../navbar/navbar";
import SummaryCardContainer from "../summaryCardContainer/summaryCardContainer";

function TagContainer(props) {
  const [tags, setTags] = useState([]);
  useEffect(() => {
    getTags();
  }, []);

  const getTags = async () => {
    const response = await fetch("/api/getTags");
    const tempTags = (await response.json()).tags;
    setTags(tempTags);
    console.log(tempTags);
  };

  const resetTags = () => {
    const tagButtons = document.querySelectorAll(".tag.button");
    tagButtons.forEach((tag) => {
      tag.classList.remove("btn-primary");
      tag.classList.remove("selected");
      tag.classList.add("btn-outline-primary");
    });
  };

  const submissionHandler = async () => {
    const tagButtons = document.querySelectorAll(".tag.button.selected");
    const tagsArray = Array.from(tagButtons);
    tagsArray.map((tag, i) => {
      tagsArray[i] = tag.textContent;
    });
    switch (props.submissionMethod) {
      //New school case = append tags to new school data, post to db
      case "newSchool":
        const { newSchoolData } = props;
        newSchoolData.tags = tagsArray;

        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newSchoolData),
        };

        const response = await fetch("/api/addNewSchool", options);
        const message = await response.json();
        if (response.status !== 200) {
          console.error(message.result);
        } else {
          console.log("should be going home");
          window.location.reload();
        }
        return;

      case "comparison":
        console.log("in comparison");

        const options_comparison = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userTags: tagsArray }),
        };

        const response_comparison = await fetch(
          "/api/generateScores",
          options_comparison
        );

        const comparison_result = await response_comparison.json();
        if (response_comparison.status !== 200) {
          console.log(comparison_result);
        } else {
          console.log("rendering suggestions");
          ReactDOM.render(
            <React.Fragment>
              <Navbar />
              <SummaryCardContainer schools={comparison_result} />
              <Navbar />
            </React.Fragment>,
            document.getElementById("root")
          );
          // window.location.reload();
        }
        return;
    }
  };

  return (
    <div className="main container">
      <div className="content wrapper">
        <h2>What interests you?</h2>
        <p className="description text">
          Select some items from the list below and we'll find the perfect
          school for you!
        </p>
        <div className="tags wrapper">
          {tags.map((tag, i) => {
            return <IndividualTag id={i} _id={tag._id} key={i} tag={tag.tag} />;
          })}
        </div>
        <div className="tags footer">
          <button
            className="btn btn-secondary btn-lg m-2"
            onClick={() => submissionHandler()}
          >
            Submit
          </button>
          <button
            className="btn btn-secondary btn-lg m-2"
            onClick={() => resetTags()}
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
    </div>
  );
}

export default TagContainer;
