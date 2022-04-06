import React, { useState, useEffect } from "react";
import "./ImageGallery.css";
import SingleImageContainer from "./SingleImageContainer";
const images = require.context("../../../assets", true);

const emptyArray = ["test2.jpg", "test2.jpg"];

function ImageGallery() {
  const [img, setImg] = useState();
  useEffect(async () => {
    const temp = await fetch("/assets/test2.jpg");
    const url = await temp.url;
    setImg(url);
  }, []);

  return (
    <div id="imageGalleryRoot">
      {emptyArray.map((element, i) => {
        console.log(img);
        return <SingleImageContainer key={i} url={img} />;
      })}
    </div>
  );
}

export default ImageGallery;
