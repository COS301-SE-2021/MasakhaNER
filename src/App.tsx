import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  // const [time, setTime] = useState(0);

  // useEffect(() => {
  //   fetch("https://masakha-api.herokuapp.com/")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTime(data.time)
  //     });
  // }, []);

  return (
    <div className="App">
      <h1>StopDaCap : MasakhaNER</h1>
      {/* <p>{time}</p> */}
    </div>
  );
}

export default App;
