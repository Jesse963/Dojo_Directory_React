import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import IndividualTag from "./IndividualTag";
import "./TagContainer.css";
import Navbar from "../navbar/navbar";
import SummaryCardContainer from "../summaryCardContainer/summaryCardContainer";
import Footer from "../footer/footer";

function TagContainer(props) {
  const [tags, setTags] = useState([]);
  useEffect(async () => {
    await getTags();

    // Remove below code for prod. Randomly selects 10 tags and enters postcode for ease
    let tags = Array.from(document.querySelectorAll(".tag.button"));
    const tagsToSelect = tags.sort(() => 0.5 - Math.random()).slice(0, 10);
    tagsToSelect.forEach((element) => element.classList.add("selected"));
    if (props.submissionMethod === "comparison")
      document.getElementById("tagContainerPostcode").value = 2137;
  }, []);

  //----------- GET TAGS -------------
  const getTags = async () => {
    const response = await fetch("/api/getTags");
    const tempTags = (await response.json()).tags;
    setTags(tempTags);
    console.log(tempTags);
  };

  //----------- RESET TAGS -------------
  const resetTags = () => {
    const tagButtons = document.querySelectorAll(".tag.button");
    tagButtons.forEach((tag) => {
      tag.classList.remove("btn-primary");
      tag.classList.remove("selected");
      tag.classList.add("btn-outline-primary");
    });
  };

  //----------- POSTCODE TO COORDS -------------
  const postcodeToCoord = async (postcode) => {
    const response = await fetch("/api/postcodeToCoords", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ postcode: postcode }),
    });
    const locationDetails = await response.json();
    // console.log(locationDetails);
    return locationDetails;
  };

  //----------- SUBMISSION HANDLER -------------
  const submissionHandler = async () => {
    const postcodeElement = document.getElementById("tagContainerPostcode");
    const maxDistance = document.getElementById("maxDistanceSlider");
    const tagButtons = document.querySelectorAll(".tag.button.selected");
    const tagsArray = Array.from(tagButtons);

    // Check for valid postcode and correct tag number

    if (tagsArray.length > 10 || tagsArray.length < 5)
      return window.alert("Please select 5-10 items");

    tagsArray.map((tag, i) => {
      tagsArray[i] = tag.textContent;
    });
    switch (props.submissionMethod) {
      //New school case = append tags to new school data, post to db
      case "newSchool":
        const { newSchoolData } = props;
        newSchoolData.tags = tagsArray;

        const location = await postcodeToCoord(newSchoolData.postcode);
        newSchoolData.location = {
          type: "Point",
          coordinates: [location.lon, location.lat],
        };

        console.log(newSchoolData);

        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newSchoolData),
        };

        const response = await fetch("/api/addNewSchool", options);
        const message = await response.json();
        if (response.status !== 200) {
          console.error(message.result);
        } else {
          console.log("should be going home");
          window.location.reload();
        }
        return;

      case "comparison":
        console.log("in comparison");

        if (!postcodeElement.checkValidity())
          return window.alert("Postcode is not valid");

        const postcodeOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ postcode: postcodeElement.value }),
        };
        const res = await fetch("/api/postcodeToCoords", postcodeOptions);
        const coords = await res.json();
        const formattedCoords = [coords.lon, coords.lat];

        console.log(formattedCoords);

        const options_comparison = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userTags: tagsArray,
            coordinates: formattedCoords,
            // Distance recorded in km, search query needs m, convert below
            maxDistance: maxDistance.value * 1000,
          }),
        };

        const response_comparison = await fetch(
          "/api/generateScores",
          options_comparison
        );

        const comparison_result = await response_comparison.json();
        if (response_comparison.status !== 200) {
          console.log(comparison_result);
        } else {
          console.log("rendering suggestions");
          ReactDOM.render(
            <React.Fragment>
              <Navbar />
              <SummaryCardContainer schools={comparison_result} />
              <Footer />
            </React.Fragment>,
            document.getElementById("root")
          );
          // window.location.reload();
        }
        return;
    }
  };
  const checkSlider = () => {
    if (props.submissionMethod === "comparison")
      return (
        <div className="settings container">
          <input
            required
            minLength={4}
            maxLength={4}
            type="number"
            id="tagContainerPostcode"
            placeholder="Enter Postcode"
          />
          <input
            name="slider"
            type="range"
            min="0"
            max="100"
            defaultValue="10"
            class="slider"
            id="maxDistanceSlider"
            onInput={() => sliderHandler()}
          ></input>
          <label id="sliderOutput" htmlFor="slider">
            10km
          </label>
        </div>
      );
  };

  const heading = () => {
    if (props.submissionMethod === "comparison") return "What interests you?";
    return "What does your school focus on?";
  };

  const description = () => {
    if (props.submissionMethod === "comparison")
      return "Select some items from the list below and we'll find the perfect school for you!";
    return "Select some items from the list below to tell others what you do in your classes!";
  };

  return (
    <div className="content wrapper">
      <h2>{heading()}</h2>
      <p className="description text">{description()}</p>
      <div className="tags wrapper">
        {tags.map((tag, i) => {
          return <IndividualTag id={i} _id={tag._id} key={i} tag={tag.tag} />;
        })}
      </div>
      <div className="tags footer">
        {checkSlider()}

        <button onClick={() => submissionHandler()}>Submit</button>
        <button onClick={() => resetTags()}>Reset</button>
        <button onClick={() => (window.location.href = "/")}>Home</button>
      </div>
    </div>
  );
}

const sliderHandler = () => {
  const slider = document.getElementById("maxDistanceSlider");
  const rangeIndicator = document.getElementById("sliderOutput");
  rangeIndicator.textContent = `${slider.value}km`;
};

export default TagContainer;
