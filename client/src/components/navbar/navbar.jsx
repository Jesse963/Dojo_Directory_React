import React from "react";
import "./navbar.css";

const NavBar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <a className="navbar-brand" href="/">
        Dojo Directory V2
        <span className="badge badge-pill badge-secondary"></span>
      </a>
    </nav>
  );
};

export default NavBar;
