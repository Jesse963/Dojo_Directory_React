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
        <TagContainer />
      </React.Fragment>,
      document.getElementById("root")
    );
  }

  renderNewSchoolPage() {
    ReactDOM.render(
      <React.Fragment>
        <NavBar />
        <NewSchoolsForm />
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
      <div id="StartPageContainer">
        <h1>Welcome to the Dojo Directory</h1>
        <h4>
          The Dojo Directory is a service for matching you to your perfect
          martial arts school Click the button below and take the quiz, we'll
          then match you against our directory of Dojos, Studios and gyms
        </h4>
        <div id="buttonContainer">
          <button
            className="btn btn-primary btn-lg m-3"
            onClick={() => {
              this.renderTagsContainer();
            }}
          >
            Find a school
          </button>
          <button
            className="btn btn-primary btn-lg m-3"
            onClick={() => {
              this.renderNewSchoolPage();
            }}
          >
            Add a school
          </button>
          <button
            className="btn btn-primary btn-lg m-3"
            // onClick={() => console.log(this.state.schools)}
            onClick={() => this.props.listAllSchools(this.state.schools)}
          >
            List All School
          </button>
        </div>
      </div>
    );
  }
}

export default StartPage;
