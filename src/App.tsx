import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    fetch("/")
      .then((res) => res.json())
      .then((data) => {
        setTime(data.time)
      });
  }, []);

  return (
    <div className="App">
      <h1>StopDaCap : MasakhaNER</h1>
      <p>{time}</p>
    </div>
  );
}

export default App;
