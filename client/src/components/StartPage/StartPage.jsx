import React, { Component } from "react";
import "./StartPage.css";
import ReactDOM from "react-dom";
import NewSchoolsForm from "../NewSchoolForm/NewSchoolForm";
import NavBar from "../navbar/navbar";
import TagContainer from "../Tagging/TagContainer";
import { compareArrays } from "../../Scripts/ScoreCalculations";

class StartPage extends React.Component {
  getSchools = async () => {
    console.log("Entered getSchools");
    const response = await fetch("/api/getAll");
    console.log(`Raw Schools: ${response}`);

    let schools = await response.json();
    console.log("Parsed Schools:", schools.schools);
    this.setState({ schools: schools });
  };

  renderTagsContainer() {
    ReactDOM.render(
      <React.Fragment>
        <NavBar />
        <TagContainer submissionMethod="comparison" />
        <NavBar />
      </React.Fragment>,
      document.getElementById("root")
    );
  }

  renderNewSchoolPage() {
    ReactDOM.render(
      <React.Fragment>
        <NavBar />
        <NewSchoolsForm />
        <NavBar />
      </React.Fragment>,
      document.getElementById("root")
    );
  }

  compareArrays = (userTags, schoolTags) => {
    const intersection = userTags.filter((tag) => schoolTags.includes(tag));
    console.log(intersection.length);
    return intersection;
  };

  componentDidMount = async () => {
    this.compareArrays(["a", "b", "c"], ["a"]);
    let schools = await this.getSchools();
  };

  render() {
    console.log(this.state);
    return (
      <div className="main container">
        <h1>Welcome to the Dojo Directory</h1>
        <p className="intro text">
          The Dojo Directory is a service for matching you to your perfect
          martial arts school Click the button below and take the quiz, we'll
          then match you against our directory of Dojos, Studios and gyms
        </p>
        <div id="buttonContainer">
          <button
            className="control button"
            onClick={() => {
              this.renderTagsContainer();
            }}
          >
            Find a school
          </button>
          <button
            className="control button"
            onClick={() => {
              this.renderNewSchoolPage();
            }}
          >
            Add a school
          </button>
          <button
            className="control button"
            onClick={() => alert("You haven't dont that yet, stupid")}
            // onClick={() => this.props.listAllSchools(this.state.schools)}
          >
            Search schools
          </button>
        </div>
      </div>
    );
  }
}

export default StartPage;
