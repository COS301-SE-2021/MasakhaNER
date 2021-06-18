import React from "react";
import InputSection from "../InputSection/InputSection";
import Output from "../Output/Output";
import Top from "../top/Top";
import "./Input.css";
import "bootstrap/dist/css/bootstrap.min.css";

export const Input = () => {
  return (
    <div>
      <div className="input">
        <div className="input-header">
          <h2>Train model</h2>
        </div>
        <label htmlFor="languages">Choose a language:</label>
        <br />
        <select name="languages" id="language">
          <option value="swahili">Swahili</option>
        </select>
        <div className="container">
          <InputSection />
        </div>
        <hr />
        <div id="feedback">
          <h3>Feedback</h3>
          <br />
          <label htmlFor="languages">Correction: </label>
          <br />
          <input placeholder="Type here..."></input>
          <select name="languages" id="language">
            <option value="person">PERSON</option>
            <option value="location">LOCATION</option>
            <option value="date">DATE</option>
            <option value="organisation">ORGANISATION</option>
          </select>
          <br />
          <br />
          <button
            className="btn btn-dark"
            onClick={() => {
              alert("Feedback submitted");
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
