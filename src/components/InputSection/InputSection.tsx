import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import "./InputSection.css";
import Output from "../Output/Output";

export default function InputSection() {
  const [input, setInput] = useState("");
  const [clicked, setClicked] = useState(false);
  const [outputData, setOutputData] = useState([]);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

  return (
    <div className="inputSection">
      <form onSubmit={handleSubmit}>
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
