import Nav from "../../components/nav/Nav";
import styled from "styled-components";
import { useEffect, useState } from "react";
import React from "react";
import useSpeechToText from "react-hook-speech-to-text";

const InfoBlock = styled.div`
  width: 100%;
  height: 30vh;
  margin-top: 7vh;
  text-align: left;
  padding-top: 4vh;

  h1 {
    opacity: 0.7;
    color: #1c5f22;
    margin-left: 9vw;
  }

  p {
    margin-left: 9vw;
    width: 75vw;
  }
`;

const Containter = styled.div`
  width: 100%;
  height: 30vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const InputBox = styled.textarea`
  width: 32vw;
  margin-right: 80px;
  border-radius: 10px;
  border: solid 0.1px rgba(153, 153, 153, 0.2);
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.05);
  padding: 20px;

  &:focus {
    outline: none;
  }
`;

const OutputBox = styled.div`
  width: 32vw;
  margin-left: 80px;
  border-radius: 10px;
  border: solid 0.1px rgba(153, 153, 153, 0.2);
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.05);
`;

const Button = styled.button`
  border: solid 0.1px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  background-color: #1c5f22;
  border-radius: 5px;
  height: 35px;
  padding-left: 1em;
  padding-right: 1em;
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.05);
  transform: translateX(-33vw);
  margin-top: 10px;

  &:hover {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
    transition: 0.4s;
    background-color: #34833b;
    border: solid 1px #34833b;
  }
  position: relative;
  color: white;
`;

const Select = styled.select`
  margin-bottom: 10px;
  border-radius: 5px;
`;

const Translate = () => {
  const [input, setInput] = useState("");
  const [data, setData] = useState({});

  const options: any = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: input,
    }),
  };

  const handleSend = () => {
    fetch("/translate", options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => setData(data));
  };

  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    interimResult,
  } = useSpeechToText({
    continuous: true,
    timeout: 10000,
    speechRecognitionProperties: { interimResults: true },
  });

  useEffect(() => {
    results.map((result) => {
      console.log(result);
      setInput(result as string);
    });
  });

  return (
    <>
      <Nav />
      <InfoBlock>
        <h1>Machine Translation</h1>
        <p>
          Enter text below to send to the MasakhaNER model. The model will
          decompose the uploaded text and recognise four entities. Organisation,
          Location, Date and Person. Enter text below or upload a text file
          containing text you want like to send to the model.
        </p>
      </InfoBlock>
      <Select style={{ transform: "translateX(-430px)" }}>
        <option value="english">English</option>
      </Select>
      <Select style={{ transform: "translateX(70px)" }}>
        <option value="Igbo">Igbo</option>
      </Select>
      <Containter>
        <InputBox
          onClick={handleSend}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <OutputBox></OutputBox>
      </Containter>
      <div style={{ transform: "translateX(80px)" }}>
        <Button onClick={isRecording ? stopSpeechToText : startSpeechToText}>
          {isRecording ? "Stop Recording" : "Start Recording"}
        </Button>
        <Button style={{ marginLeft: "10px" }}>Translate</Button>
      </div>
    </>
  );
};

export default Translate;
