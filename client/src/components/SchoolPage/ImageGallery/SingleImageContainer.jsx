import React, { useEffect } from "react";
import "./SingleImageContainer.css";
import "./ImageGallery.css";

function SingleImageContainer(props) {
  return (
    <div id="singleImageContainer">
      <img src={props.url} alt="" srcset="" />
    </div>
  );
}

export default SingleImageContainer;
