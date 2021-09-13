import React, { Component } from "react";
import "./SchoolPageRoot.css";
import ImageGallery from "./ImageGallery/ImageGallery";
import SchoolPageContent from "./SchoolPageContent/SchoolPageContent";

class SchoolPageRoot extends React.Component {
  render() {
    return (
      <div id="schoolPageRoot">
        <h1>{this.props.dojo || "Mushin Goju Ryu Karate Academy"}</h1>
        <ImageGallery />
        <SchoolPageContent />
      </div>
    );
  }
}

export default SchoolPageRoot;
