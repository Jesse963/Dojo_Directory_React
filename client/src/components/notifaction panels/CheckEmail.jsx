import React from "react";

function CheckEmail() {
  return (
    <div className="content wrapper check email notification">
      <h2>Check Your Email!</h2>
      <p>
        A verification has been sent to your email address. Just click the link
        and you'll be on your way!
      </p>
      <br />
      <button onClick={() => (window.location.href = "/")}>Home</button>
    </div>
  );
}
export default CheckEmail;
