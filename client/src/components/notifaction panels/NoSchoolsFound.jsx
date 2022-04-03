import React from "react";

function NoSchoolsFound() {
  return (
    <div className="content wrapper check email notification">
      <h2>We couldn't find any schools in your area. &#128557;</h2>
      <p>
        We can let you know when we have some schools in your area.{" "}
        <a onClick={() => window.alert("hasnt been done yet")} href="">
          Notify me!
        </a>
      </p>
      <p>Know a school that should be here? Send them our way!</p>
      <br />
      <button onClick={() => (window.location.href = "/")}>Home</button>
    </div>
  );
}
export default NoSchoolsFound;
