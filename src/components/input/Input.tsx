import React from "react";
import InputSection from "../InputSection/InputSection";
import Output from "../Output/Output";
import Top from "../Top/Top";
import "./Input.css";

export const Input = () => {
  return (
    <div className="input">
      <Top />
      <div className="container">
        <InputSection />
        <Output />
      </div>
    </div>
  );
};
