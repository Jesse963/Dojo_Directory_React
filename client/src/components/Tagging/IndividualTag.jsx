import React, { Component } from "react";
import "./IndividualTag.css";

class IndividualTag extends React.Component {
  clickHandler() {
    console.log(`clicked ${this.props.tag}`);
    const button = document.getElementById("tagButton" + this.props.id);
    button.classList.toggle("selected");
  }

  render() {
    return (
      <button
        id={"tagButton" + this.props.id}
        className="tag button"
        onClick={() => this.clickHandler()}
      >
        {this.props.tag}
      </button>
    );
  }
}

export default IndividualTag;
