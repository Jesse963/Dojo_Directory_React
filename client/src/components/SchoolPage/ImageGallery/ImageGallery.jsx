import React, { Component } from "react";
import "./ImageGallery.css";
import SingleImageContainer from "./SingleImageContainer";

const emptyArray = ["", "", "", "", ""];

class ImageGallery extends React.Component {
  render() {
    return (
      <div id="imageGalleryRoot">
        {emptyArray.map((element, i) => {
          return <SingleImageContainer />;
        })}
      </div>
    );
  }
}

export default ImageGallery;
