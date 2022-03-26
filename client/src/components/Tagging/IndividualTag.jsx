import React from "react";

function IndividualTag(props) {
  const clickHandler = () => {
    console.log(`clicked ${props.tag}`);
    const button = document.getElementById("tagButton" + props.id);
    button.classList.toggle("selected");
  };

  return (
    <button
      id={"tagButton" + props.id}
      className="tag button"
      onClick={() => clickHandler()}
    >
      {props.tag}
    </button>
  );
}

export default IndividualTag;
