import React from "react";
import "./navbar.css";

const loadTestData = async () => {
  console.log("Populating test schools");
  window.alert("Server needs to be restarted after populating test schools");
  const response = await fetch("/api/populateTestData");
  const message = await response.json();
  return console.log(message);
};

const NavBar = () => {
  return (
    <nav className="navbar">
      <a className="" href="/">
        <h1>Dojo Directory</h1>
      </a>
      <button className="load test data" onClick={() => loadTestData()}>
        Populate Test Data
      </button>
    </nav>
  );
};

export default NavBar;
