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
    const response = await fetch("/api/retrieveLoggedInSchool");
    const { school, success } = await response.json();
    // const message = await response.json();
    // console.log("RES: ", message);
    console.log("school: ", school);
    if (success) {
      setSchool(school);
      setLoggedIn(true);
    }
    if (window.location.href.includes("/api/")) {
      await verifyEmail();
    }
  }, []);
  //===================================================
  const verifyEmail = async () => {
    console.log("Verifying email address");
    const apiToCall = window.location.href.split("/api/")[1];
    const response = await fetch("/api/" + apiToCall);
    const { school, success } = await response.json();
    console.log(school);
    if (success) {
      setSchool(school);
      setLoggedIn(true);
    }
    console.log("calling api");
  };

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
    if (loggedIn && school)
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
