import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import SummaryCardContainer from "./components/summaryCardContainer/summaryCardContainer";
import NavBar from "./components/navbar/navbar";
import SchoolPageRoot from "./components/SchoolPage/SchoolPageRoot";
import StartPage from "./components/StartPage/StartPage";
import TagContainer from "./components/Tagging/TagContainer";
import NewSchoolForm from "./components/NewSchoolForm/NewSchoolForm";
import SubmitReviewForm from "./components/SchoolPage/SchoolReviews/SubmitReview";

function listAllSchools(schools) {
  console.log(schools.schools);
  ReactDOM.render(
    <React.Fragment>
      <NavBar />
      <SummaryCardContainer schools={schools.schools} />
      <NavBar />
    </React.Fragment>,
    document.querySelector("#root")
  );
}

function App() {
  return (
    <React.Fragment>
      <NavBar />

      <StartPage listAllSchools={listAllSchools} />
      <SubmitReviewForm />
      <NavBar />
      {/* <SchoolPageRoot /> */}
      {/* <SummaryCardContainer schools={testDojos} /> */}
      {/* <TagContainer /> */}
      {/* <NewSchoolsForm /> */}
    </React.Fragment>
  );
}

export default App;
