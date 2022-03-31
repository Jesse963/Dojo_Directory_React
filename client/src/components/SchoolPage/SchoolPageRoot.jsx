import React, { Component } from "react";
import "./SchoolPageRoot.css";
import ImageGallery from "./ImageGallery/ImageGallery";
import SchoolPageContent from "./SchoolPageContent/SchoolPageContent";

function SchoolPageRoot(props) {
  const topScroll = () => {
    const elementToScroll = document.getElementById("mainContent");
    console.log(elementToScroll);
    elementToScroll.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="main container" id="test">
      <h2>{props.dojo.name || "Mushin Goju Ryu Karate Academy"}</h2>
      <div className="content container">
        <ImageGallery />
        <SchoolPageContent
          dojo={props.dojo}
          history={props.history}
          loggedIn={props.loggedIn}
        />
      </div>
      <div id="toTop">
        <a
          onClick={() => {
            topScroll();
          }}
        >
          Top
        </a>
      </div>
    </div>
  );
}

export default SchoolPageRoot;
