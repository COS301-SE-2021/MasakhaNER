import React, { useEffect, useState } from 'react'
import Output from '../Output/Output';
import "./historySection.css"


const something = (d : any) => {
    console.log("my function:" + d);
}

export default function HistorySection() {
    const [clicked, setClicked] = useState(false);
    const [outputData, setOutputData] = useState(null);
    const [input2, setInput2] = useState("");
    var history : String[] = new Array();
    
    const options: any = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ input: input2 }),
    };
    
    useEffect(() => {
        fetch("/input", options)
          .then((res) => res.json())
          .then((data) => {
            setOutputData(data.output);
          })
          .catch((err) => console.log(err));
    }, [clicked]);
    

    var stored = localStorage.getItem("history");
    if(stored != null ) history = stored.split(",");
    console.log("At History data: " + JSON.stringify(history))
    return (
        <div className = 'ourHistory'>
            <h4>History</h4>
            <ul>
                {history.map((history) => (
                    <li onClick={() => {setClicked(!clicked); setInput2(history.toString());  something(history.toString());}}>{history}</li>
                ))}
            </ul>
            <Output data={outputData} input={input2}/>
        </div>
    )
}


