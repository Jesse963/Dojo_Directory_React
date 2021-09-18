import React, { Component } from "react";
import IndividualTag from "./IndividualTag";
import "./TagContainer.css";

const tags = [
  "Striking",
  "Grappling",
  "Ground Fighting",
  "Kicking",
  "Throwing",
  "Weapons",
  "Traditional",
  "Modern",
  "Self-Defense",
  "Competition",
  "Something else",
  "Eggs",
  "Small Classes",
  "Large Classes",
  "Beginner Friendly",
  "Professional Fighting",
  "Full Contact",
  "Good for kids",
  "Adults only classes",
  "Free Trial Available",
];
class TagContainer extends React.Component {
  clickHandler() {
    console.log("hello");
  }
  render() {
    return (
      <div id="tagsContainer">
        {tags.map((tag, i) => {
          return (
            <IndividualTag
              clickHandler={() => this.clickHandler()}
              id={i}
              tag={tag}
            />
          );
        })}
      </div>
    );
  }
}

export default TagContainer;
