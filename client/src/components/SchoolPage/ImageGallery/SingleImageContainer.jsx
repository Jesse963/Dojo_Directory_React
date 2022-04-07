import React, { useEffect } from "react";
import "./SingleImageContainer.css";
import "./ImageGallery.css";

function SingleImageContainer(props) {
  return (
    <li
      id="singleImageContainer"
      onClick={() => {
        console.log(props.index);
        props.imageClickHandler(props.index);
      }}
    >
      <img src={props.url} alt="" srcset="" />
    </li>
  );
}

export default SingleImageContainer;
