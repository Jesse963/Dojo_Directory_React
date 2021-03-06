import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import IndividualTag from "./IndividualTag";
import "./TagContainer.css";
import SummaryCardContainer from "../summaryCardContainer/summaryCardContainer";
import StartPage from "../StartPage/StartPage";
import CheckEmail from "../notifaction panels/CheckEmail";
import NoSchoolsFound from "../notifaction panels/NoSchoolsFound";

function TagContainer(props) {
  const [tags, setTags] = useState([]);
  useEffect(async () => {
    await getTags();

    if (props.selected) {
      props.selected.forEach((selection, i) => {
        console.log(selection.replace(" ", "."));
        const buttonToSelect = document.querySelector(
          ".tag.button." + selection.replaceAll(" ", ".")
        );
        setTimeout(() => {
          buttonToSelect.classList.add("selected");
        }, 100 * i);
      });
      return console.log("selections exist");
    }
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

        const options = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newSchoolData),
        };

        let response = await fetch("/api/addNewSchool", options);
        let message = await response.json();
        if (response.status !== 200) {
          return console.error(message.result);
        }

        console.log("About to send verification email");
        options.body = JSON.stringify({ email: newSchoolData.email });
        console.log(options);
        response = await fetch("/api/sendVerificationEmail", options);
        message = await response.json();
        console.log(message);
        return ReactDOM.render(
          <React.Fragment>
            <CheckEmail />
          </React.Fragment>,
          document.getElementById("mainContentContainer")
        );

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
        if (response_comparison.status !== 200)
          return console.log(comparison_result);
        console.log("rendering suggestions");
        if (comparison_result.length === 0 || !comparison_result)
          return ReactDOM.render(
            <React.Fragment>
              <NoSchoolsFound />
            </React.Fragment>,
            document.getElementById("mainContentContainer")
          );
        ReactDOM.render(
          <React.Fragment>
            <SummaryCardContainer
              schools={comparison_result}
              tags={tagsArray}
            />
            {/* tags={tags} */}
          </React.Fragment>,
          document.getElementById("mainContentContainer")
        );
        // window.location.reload();
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
    <div className="content wrapper tagging">
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
