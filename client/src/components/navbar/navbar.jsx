import React, { useState } from "react";
import "./navbar.css";

// --------- GENERATE TEST SCHOOLS --------- //
const loadTestData = async () => {
  console.log("Populating test schools");
  window.alert("Server needs to be restarted after populating test schools");
  const response = await fetch("/api/populateTestData");
  const message = await response.json();
  return console.log(message);
};

// --------- LOGOUT --------- //
const logout = async () => {
  await fetch("/api/logout");
  window.location.href = "/";
  console.log("Logged out");
};

// --------- OPEN MODAL --------- //
const showLoginModal = () => {
  const loginForm = document.getElementById("loginFormModal");
  loginForm.showModal();
};

// --------- CLOSE MODAL --------- //
const closeModal = () => {
  document.getElementById("loginFormModal").close();
};

// --------- LOGIN HANDLER --------- //
const loginHandler = async (e) => {
  e.preventDefault();
  // Get email, password from form input
  const inputs = Array.from(document.querySelectorAll("#loginForm input"));
  const [email, password] = inputs.map((input) => input.value);

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
  };

  const response = await fetch("/api/login", options);
  const { success } = await response.json();

  if (!success) return false;

  closeModal();
  //If login successful get school data from JWT (stored in HTTP only cookie)
  const schoolResponse = await fetch("/api/retrieveLoggedInSchool");
  const { school } = await schoolResponse.json();

  return school;
};

const renderNavLinks = (props) => {
  const { loggedIn, loginToSchool, setLoginStatus } = props;
  if (!loggedIn)
    return (
      <div className="links">
        <a onClick={() => showLoginModal()}>Log In</a>
      </div>
    );
  return (
    <div className="links">
      <a onClick={() => props.renderLoggedInSchool()}>My School</a>
      <a
        onClick={() => {
          setLoginStatus(false);
          loginToSchool();
          logout();
        }}
      >
        Log out
      </a>
    </div>
  );
};

// --------- NAVBAR --------- //
const NavBar = (props) => {
  return (
    <nav className="navbar">
      <a className="" onClick={() => props.renderStartPage()}>
        <h1>Dojo Directory</h1>
      </a>
      {renderNavLinks(props)}
      {/* <button className="load test data" onClick={() => loadTestData()}>
        Populate Test Data
      </button> */}
      {/* <button className="test login" onClick={() => showLoginModal()}>
        Test login
      </button> */}
      {/* <button
        onClick={() => {
          testLogout();
          props.setLoginStatus(false);
          props.loginToSchool();
        }}
      >
        Test logout
      </button>
      <button
        className="load test data"
        onClick={() => {
          testGetLoggedInSchool();
        }}
      >
        Test get logged in school
      </button> */}

      {/* ---------  LOGIN FORM MODAL  ---------  */}
      <dialog id="loginFormModal">
        <form
          id="loginForm"
          method="javascript:void(0)"
          onSubmit={async (e) => {
            const school = await loginHandler(e);
            if (!school) return;
            props.loginToSchool(school);
            props.setLoginStatus(true);
          }}
        >
          <h2>Enter your login details</h2>
          <label htmlFor="email">Email</label>
          <input name="email" type="email" required="true" />
          <label htmlFor="password">Password</label>
          <input name="password" type="password" required="true" />
          <button type="submit">Submit</button>
          <button
            type="cancel"
            onClick={(e) => {
              e.preventDefault();
              closeModal();
            }}
          >
            Cancel
          </button>
        </form>
      </dialog>
    </nav>
  );
};

export default NavBar;
