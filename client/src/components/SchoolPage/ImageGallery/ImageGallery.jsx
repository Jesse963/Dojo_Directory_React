import React, { useState, useEffect } from "react";
import "./ImageGallery.css";
import SingleImageContainer from "./SingleImageContainer";
// const images = require.context("../../../assets", true);

const emptyArray = ["test.jpg", "test2.jpg", "test3.jpg", "test4.png"];

function ImageGallery() {
  // const [img, setImg] = useState();
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(async () => {
    emptyArray.map(async (target) => {
      const imageURL = (await fetch(`/assets/${target}`)).url;
      setImages((prevImages) => [...prevImages, imageURL]);
    });
  }, []);

  const imageClickHandler = (index) => {
    console.log(index);
    console.log("clicked image");
    const modal = document.querySelector(".carousel.container.modal");
    modal.showModal();
    modal.querySelector("img").src = images[index];

    // only add event listener to close once image is open
    window.addEventListener("click", (e) => windowClickHandler(e));
  };

  const windowClickHandler = (e) => {
    const modal = document.querySelector(".carousel.container.modal");
    if (!modal) return window.removeEventListener("click", windowClickHandler);
    const imageContainer = modal.querySelector("li");
    if (e.target == modal || e.target == imageContainer) {
      window.removeEventListener("click", windowClickHandler);
      modal.close();
    }
  };

  const changeImage = (direction) => {
    const modal = document.querySelector(".carousel.container.modal");
    const image = modal.querySelector("img");
    const index = images.indexOf(image.src);
    if (direction === "right") {
      return (image.src = images[(index + 1) % images.length]);
    }
    // loop to last image on index = 0
    index === 0
      ? (image.src = images[images.length - 1])
      : (image.src = images[index - 1]);
  };

  return (
    <React.Fragment>
      <ul class="image container carousel">
        {images.map((element, i) => {
          console.log(i);
          return (
            <SingleImageContainer
              key={i}
              index={i}
              url={element}
              imageClickHandler={imageClickHandler}
            />
          );
        })}
      </ul>

      <dialog className="carousel container modal">
        <SingleImageContainer
          key={1}
          url={images[0]}
          imageClickHandler={() => null}
        />
        <div
          className="modal control left button"
          onClick={() => changeImage("left")}
        >
          &lt;
        </div>
        <div
          className="modal control right button"
          onClick={() => changeImage("right")}
        >
          &gt;
        </div>
      </dialog>
    </React.Fragment>
  );
}

export default ImageGallery;
