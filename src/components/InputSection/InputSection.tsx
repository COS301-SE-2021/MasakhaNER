import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./InputSection.css";
import Output from "../Output/Output";
import useSpeechToText from 'react-hook-speech-to-text';

export default function InputSection() {
  const [input, setInput] = useState("");
  const [clicked, setClicked] = useState(false);
  const [outputData, setOutputData] = useState([]);

  const options: any = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({ input: input }),
  };

  useEffect(() => {
    fetch("/input", options)
      .then((res) => res.json())
      .then((data) => {
        setOutputData(data.output);
      })
      .catch((err) => console.log(err));
  }, [clicked]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

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

  return (
    <div className="inputSection">
      <form onSubmit={handleSubmit}>
      <div>
      {/* <h1>Recording: {isRecording.toString()}</h1> */}
      <button className="btn btn-dark" onClick={isRecording ? stopSpeechToText : startSpeechToText}>
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
      <ul>
        {/* TODO: Map results to input box or automatically return translation */}
        {results.map((result, index) => (
          <li key={index}>{result}</li>
        ))}
        {interimResult && <li>{interimResult}</li>}
      </ul>
    </div>
        <p>Enter text</p>
        <input
          placeholder="Type here..."
          id="testSection"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></input>

        <div className="inputButton">
          <button className="btn btn-dark" onClick={() => setClicked(!clicked)}>
            Send
          </button>
        </div>
      </form>
        <div className="output-header">
          <h2>Model output</h2>
          <Output data={outputData} />
        </div>
    </div>
  );
}
