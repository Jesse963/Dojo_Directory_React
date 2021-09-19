import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import SummaryCardContainer from "./components/summaryCardContainer/summaryCardContainer";
import NavBar from "./components/navbar/navbar";
import SchoolPageRoot from "./components/SchoolPage/SchoolPageRoot";
import StartPage from "./components/StartPage/StartPage";
import TagContainer from "./components/Tagging/TagContainer";
import NewSchoolForm from "./components/NewSchoolForm/NewSchoolForm";

function listAllSchools(schools) {
  console.log(schools.schools);
  ReactDOM.render(
    <React.Fragment>
      <NavBar />
      <SummaryCardContainer schools={schools.schools} />
    </React.Fragment>,
    document.querySelector("#root")
  );
}

function App() {
  return (
    <React.Fragment>
      <NavBar />

      <StartPage listAllSchools={listAllSchools} />
      {/* <SchoolPageRoot /> */}
      {/* <SummaryCardContainer schools={testDojos} /> */}
      {/* <TagContainer /> */}
      {/* <NewSchoolsForm /> */}
    </React.Fragment>
  );
}

export default App;
