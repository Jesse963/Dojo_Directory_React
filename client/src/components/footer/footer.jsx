import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer content">
        <div className="links">
          <a href="/">About Us</a>
          <a href="/">Add your school</a>
          <a href="/">Terms and Conditions</a>
          <a href="/">Contact</a>
          <a href="/">Report a bug</a>
          <a href="/">Suggest a feature</a>
        </div>
        <p>Copyright Jesse Jenkins - 2022</p>
      </div>
    </footer>
  );
};

export default Footer;
