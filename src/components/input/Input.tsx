import React from "react";
import InputSection from "../InputSection/InputSection";
import Output from "../Output/Output";
import Top from "../top/Top";
import "./Input.css";
import "bootstrap/dist/css/bootstrap.min.css";
import useSpeechToText from 'react-hook-speech-to-text';

const {
  error,
  isRecording,
  results,
  startSpeechToText,
  stopSpeechToText,
  interimResult
} = useSpeechToText({
  continuous: true,
  timeout: 10000,
  speechRecognitionProperties: { interimResults: true }
});

export const Input = () => {
  if (error) return <p>Web Speech API is not available in this browser 🤷‍</p>;
  return (
    <div>
      <div>
      <h1>Recording: {isRecording.toString()}</h1>
      <button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
    </div>
      <div className="input">
        <div className="input-header">
          <h2>Train model</h2>
        </div>
        <label htmlFor="languages">Choose a language</label>
        <br />
        <select name="languages" id="language">
          <option value="swahili">Swahili</option>
        </select>
        <div className="container">
          <InputSection />
        </div>
        <hr />
        <div id="feedback" className="feedback">
          <h3>Feedback</h3>
          <br />
          <label htmlFor="languages">Correction </label>
          <br />
          <input placeholder="Type here..."></input>
          <br />
          <label htmlFor="languages">Entity </label>
          <br />
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
        {/* <div className="model-output">
          
          Add Model Ouput here.
        </div> */}
      </div>
    </div>
  );
};
