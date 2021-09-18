import React, { Component } from "react";
import "./StartPage.css";

class StartPage extends React.Component {
  getSchools = async () => {
    console.log("Entered getSchools");
    const response = await fetch("/api/getAll");
    console.log(`Raw Schools: ${response}`);

    let schools = await response.json();
    console.log("Parsed Schools:", schools.schools);
    this.setState({ schools: schools });
  };

  componentDidMount = async () => {
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
          <button className="btn btn-primary btn-lg m-3">Find a school</button>
          <button className="btn btn-primary btn-lg m-3">Add a school</button>
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
