import React, { Component } from "react";
import "./SchoolPageRoot.css";
import ImageGallery from "./ImageGallery/ImageGallery";
import SchoolPageContent from "./SchoolPageContent/SchoolPageContent";

class SchoolPageRoot extends React.Component {
  render() {
    return (
      <div id="schoolPageRoot">
        <h1>{this.props.dojo.name || "Mushin Goju Ryu Karate Academy"}</h1>
        <div id="schoolPageMainContainer">
          <ImageGallery />
          <SchoolPageContent
            dojo={this.props.dojo}
            history={this.props.history}
          />
        </div>
      </div>
    );
  }
}

export default SchoolPageRoot;
