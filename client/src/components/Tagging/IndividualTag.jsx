import React, { Component } from "react";

class IndividualTag extends React.Component {
  clickHandler() {
    console.log("clicked");
    const button = document.getElementById("tagButton" + this.props.id);
    button.classList.toggle("btn-primary");
    button.classList.toggle("selected");
    button.classList.toggle("btn-outline-primary");
    this.props.clickHandler();
  }

  render() {
    return (
      <button
        id={"tagButton" + this.props.id}
        className="tag button btn btn-outline-primary btn-lg m-1"
        onClick={() => this.clickHandler()}
      >
        {this.props.tag}
      </button>
    );
  }
}

export default IndividualTag;
