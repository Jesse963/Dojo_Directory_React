import React, { Component } from "react";
import "./SchoolPageRoot.css";
import ImageGallery from "./ImageGallery/ImageGallery";
import SchoolPageContent from "./SchoolPageContent/SchoolPageContent";

class SchoolPageRoot extends React.Component {
  topScroll() {
    const elementToScroll = document.getElementById("mainContent");
    console.log(elementToScroll);
    elementToScroll.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  render() {
    return (
      <div className="main container" id="test">
        <h2>{this.props.dojo.name || "Mushin Goju Ryu Karate Academy"}</h2>
        <div className="content container">
          <ImageGallery />
          <SchoolPageContent
            dojo={this.props.dojo}
            history={this.props.history}
          />
        </div>
        <div id="toTop">
          <a
            onClick={() => {
              this.topScroll();
            }}
          >
            Top
          </a>
        </div>
      </div>
    );
  }
}

export default SchoolPageRoot;
