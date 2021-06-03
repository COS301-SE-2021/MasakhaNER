import React from "react";
import InputSection from "../InputSection/InputSection";
import Output from "../Output/Output";
import Top from "../top/Top";
import "./Input.css";

export const Input = () => {
  return (
    <div>
      <div className="input">
        <h2>Test model</h2>
        <label htmlFor="languages">Choose a language:</label>
        <select name="languages" id="language">
          <option value="Zulu">Zulu</option>
        </select>
        <div className="container">
          <InputSection />
        </div>
        <div id="feedback">
          <h3>Provide feedback on model feedback</h3>
          <br />
          <input></input>
        </div>
      </div>
    </div>
  );
};
