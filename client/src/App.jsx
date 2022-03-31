import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import NavBar from "./components/navbar/navbar";
import StartPage from "./components/StartPage/StartPage";
import SubmitReviewForm from "./components/SchoolPage/SchoolReviews/SubmitReview";
import Footer from "./components/footer/footer";
import SchoolPageRoot from "./components/SchoolPage/SchoolPageRoot";
import EditSchoolForm from "./components/SchoolPage/SchoolPageContent/EditSchoolForm";

function App() {
  const [school, setSchool] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(async () => {
    console.log("Use effect triggered in App.js");
    const response = await fetch("/api/retrieveLoggedInSchool");
    const { school, success } = await response.json();
    if (!success) return null;
    setSchool(school);
    setLoggedIn(true);
  }, []);

  const renderLoggedInSchool = () => {
    ReactDOM.render(
      <React.Fragment>
        <SchoolPageRoot dojo={school} loggedIn={true} />
      </React.Fragment>,
      document.getElementById("mainContentContainer")
    );
  };

  const renderStartPage = () => {
    ReactDOM.render(
      <React.Fragment>
        <StartPage />
      </React.Fragment>,
      document.getElementById("mainContentContainer")
    );
  };

  const checkLoggedIn = () => {
    if (loggedIn)
      return <EditSchoolForm school={school} setSchool={setSchool} />;
  };
  return (
    <React.Fragment>
      <NavBar
        loginToSchool={setSchool}
        setLoginStatus={setLoggedIn}
        renderLoggedInSchool={renderLoggedInSchool}
        renderStartPage={renderStartPage}
        loggedIn={loggedIn}
      />
      <div id="mainContentContainer">
        <StartPage />
      </div>
      <SubmitReviewForm />
      {checkLoggedIn()}
      <Footer />
    </React.Fragment>
  );
}

export default App;
