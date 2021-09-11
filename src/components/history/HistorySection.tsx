import { useState } from "react";
import Output from "../Output/Output";
import "./historySection.css";

const refreshPage = () => {
  window.location.reload();
};

export default function HistorySection() {
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [count, setCount] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [outputData, setOutputData] = useState(null);
  const [wait, setWait] = useState(3);
  var history: String[] = new Array();

  const mySend = async () => {
    console.log(input);
    setWait(2);
    const opts: any = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        input: input,
      }),
    };

    try {
      const resp = await fetch("/input", opts);
      console.log(resp);
      if (resp.status === 200) {
        const data = await resp.json();
        console.log(data);
        setOutputData(data.output);
        setInput2(input);
        console.log("input2: " + input2);
        console.log("data is ", data.output);
        setWait(1);
      } else {
        // if(count == null){
          alert("error, failed!");
          setWait(0);
        // }
      }
      console.log(wait);
    } catch (error) {
      console.log("there is an error", error);
      history.push("/");
    }
    // if(count == 1){
    //   mySend();
    //   setCount(null);
    //   setWait(2);
    // }
  };

  var stored = localStorage.getItem("history");
  if (stored != null) history = stored.split(",");
  console.log("At History data: " + JSON.stringify(history));
  return (
    <div className="ourHistory">
      <h4 onClick={refreshPage}>History</h4>
      <ul>
        {history.map((history) => (
          <li
            key={history.toString()}
            onClick={() => {
              setClicked(!clicked);
              setInput(history.toString());
              mySend();
              // setCount(1);
            }}
          >
            {history}
          </li>
        ))}
      </ul>
      {wait === 3 ? (
        ""
      ) : wait === 2 ? (
        "loading..."
      ) : wait === 1 ? (
        <Output data={outputData} input={input} />
      ) : (
        "failed"
      )}
    </div>
  );
}
