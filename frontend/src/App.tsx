import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    fetch("/index")
      .then((res) => res.json())
      .then((data) => {
        setTime(data.time)
      });
  }, []);

  return (
    <div className="App">
      <h1>StopDaCap : MasakhaNER</h1>
      <h3>{time}</h3>
    </div>
  );
}

export default App;
