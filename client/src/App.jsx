import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import NavBar from "./components/navbar/navbar";
import StartPage from "./components/StartPage/StartPage";
import SubmitReviewForm from "./components/SchoolPage/SchoolReviews/SubmitReview";
import Footer from "./components/footer/footer";
import SchoolPageRoot from "./components/SchoolPage/SchoolPageRoot";

function App() {
  const [school, setSchool] = useState();
  const [loggedIn, setLoggedIn] = useState(false);

  const renderLoggedInSchool = () => {
    ReactDOM.render(
      <React.Fragment>
        <SchoolPageRoot dojo={school} />
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
      <Footer />
    </React.Fragment>
  );
}

export default App;
