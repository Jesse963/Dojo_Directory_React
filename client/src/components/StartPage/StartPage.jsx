import React, { useState, useEffect, Component } from "react";
import "./StartPage.css";
import ReactDOM from "react-dom";
import NewSchoolsForm from "../NewSchoolForm/NewSchoolForm";
import NavBar from "../navbar/navbar";
import TagContainer from "../Tagging/TagContainer";
import { compareArrays } from "../../Scripts/ScoreCalculations";
import Footer from "../footer/footer";

function StartPage(props) {
  // const [schools, setSchools] = useState();
  // useEffect(async () => {
  //   console.log("using effect");
  //   const tempSchools = await getSchools();
  //   setSchools(tempSchools);
  // }, []);

  // const getSchools = async () => {
  //   console.log("Entered getSchools");
  //   const response = await fetch("/api/getAll");
  //   console.log(`Raw Schools: ${response}`);

  //   let schools = await response.json();
  //   console.log("Parsed Schools:", schools.schools);
  //   // setSchools(schools.schools);
  // };

  const renderTagsContainer = () => {
    ReactDOM.render(
      <React.Fragment>
        <NavBar />
        <TagContainer submissionMethod="comparison" />
        <Footer />
      </React.Fragment>,
      document.getElementById("root")
    );
  };

  const renderNewSchoolPage = () => {
    ReactDOM.render(
      <React.Fragment>
        <NavBar />
        <NewSchoolsForm />
        <Footer />
      </React.Fragment>,
      document.getElementById("root")
    );
  };

  // const compareArrays = (userTags, schoolTags) => {
  //   const intersection = userTags.filter((tag) => schoolTags.includes(tag));
  //   console.log(intersection.length);
  //   return intersection;
  // };

  return (
    // <div className="main container">
    <div className="content wrapper">
      <h1>Welcome to the Dojo Directory</h1>
      <p className="intro text">
        The Dojo Directory is a service for matching you to your perfect martial
        arts school Click the button below and take the quiz, we'll then match
        you against our directory of Dojos, Studios and gyms
      </p>
      <div id="buttonContainer">
        <button
          className="control button"
          onClick={() => {
            renderTagsContainer();
          }}
        >
          Find a school
        </button>
        <button
          className="control button"
          onClick={() => {
            renderNewSchoolPage();
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
    // </div>
  );
}

export default StartPage;
