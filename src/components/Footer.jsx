import React, { useState, useEffect } from "react";
import {
  FacebookLogo,
  InstagramLogo,
  TwitterLogo,
  YoutubeLogo,
  PinterestLogo,
} from "phosphor-react";
import "./Footer.css";

const Footer = () => {
  const [userEmail, setUserEmail] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handleUserEmail = (e) => {
    const { value } = e.target;
    setUserEmail(value);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidationMessage(
      emailRegex.test(value) ? "" : "Please enter a valid email."
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validationMessage || !userEmail) {
      console.log("Please fix validation errors.");
      return;
    }

    // Simulate saving to local storage for portfolio/demo
    const savedSubscribers =
      JSON.parse(localStorage.getItem("subscribers")) || [];
    if (savedSubscribers.includes(userEmail)) {
      setValidationMessage("You're already subscribed!");
      return;
    }

    savedSubscribers.push(userEmail);
    localStorage.setItem("subscribers", JSON.stringify(savedSubscribers));
    console.log("Email submitted:", userEmail);

    setValidationMessage("You are subscribed!");
    setUserEmail("");
  };

  return (
    <footer>
      <section className="footerContainer">
        <div className="socialContainer">
          <p className="emailSales">
            Be the first to know about new arrivals & sales.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="email_button">
              <input
                id="email"
                type="email"
                className="enterEmail"
                placeholder="Enter your email"
                value={userEmail}
                onChange={handleUserEmail}
                required
              />
              <button className="handleButton" type="submit">
                Submit
              </button>
            </div>
          </form>

          {validationMessage && (
            <p className="confirmationMessage">{validationMessage}</p>
          )}
          <span className="followUs">Follow Us</span>
          <div className="socialMediaLinksContainer">
            <p className="facebookLogo">
              <FacebookLogo size={24} />
            </p>
            <p className="instagramLogo">
              <InstagramLogo size={24} />
            </p>
            <p className="twitterLogo">
              <TwitterLogo size={24} />
            </p>
            <p className="youtubeLogo">
              <YoutubeLogo size={24} />
            </p>
            <p className="pinterestLogo">
              <PinterestLogo size={24} />
            </p>
          </div>
        </div>
        <div className="infoContainer">
          <p>Customer Service</p>
          <p>Our Company</p>
          <p>Find A Store</p>
        </div>
      </section>
      <p className="copyRightLogo">&copy; {new Date().getFullYear()} Mi Casa</p>
    </footer>
  );
};

export default Footer;
