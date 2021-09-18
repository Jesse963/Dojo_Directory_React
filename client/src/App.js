import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import SummaryCardContainer from "./components/summaryCardContainer/summaryCardContainer";
import NavBar from "./components/navbar/navbar";
import SchoolPageRoot from "./components/SchoolPage/SchoolPageRoot";
import StartPage from "./components/StartPage/StartPage";
import TagContainer from "./components/Tagging/TagContainer";
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
      {/* <SchoolPag5eRoot /> */}
      {/* <SummaryCardContainer schools={testDojos} /> */}
      <TagContainer />
    </React.Fragment>
  );
}

export default App;
