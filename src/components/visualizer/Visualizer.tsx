import React, { useState } from "react";
import { __DATA__ } from "./data";
import {
    MainContainer,
    Container,
    BarChartContainer,
    Number,
    BlackLine,
    MakeBar
  } from "./styles";
let data =__DATA__;
let outData = new Array();
export default function Visualizer() {
    const [color, setColor] = useState("black");
    // const [word, setWord] = useState("PER");
    const [wait, setWait] = useState(1);
    const [out, SetOut] = useState (data);

    const getData = async (word:String) => {
        setWait(2);
        const opts: any = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": localStorage.getItem("token"),
          },
        };
    
        try {
          const resp = await fetch("/input", opts);
          console.log(resp);
          if (resp.status === 200) {
            data = await resp.json();
            data.sort((a, b) => a.count < b.count ? 1 : -1);
            let count = 0;
            if(word == "Person"){
                for( let x in data){
                    if((data[x].entity == "B-PER" || data[x].entity == "I-PER") && count < 6){
                        outData[count] = data[x];
                        count ++;
                    }
                }
            }
            else if(word == "Date"){
                for( let x in data){
                    if((data[x].entity == "B-DATE" || data[x].entity == "I-DATE") && count < 6){
                        outData[count] = data[x];
                        count ++;
                    }
                }
            }
            else if(word == "Location"){
                for( let x in data){
                    if((data[x].entity == "B-LOC" || data[x].entity == "I-LOC") && count < 6){
                        outData[count] = data[x];
                        count ++;
                    }
                }
            }
            else{
                for( let x in data){
                    if((data[x].entity == "B-ORG" || data[x].entity == "I-ORG") && count < 6){
                        outData[count] = data[x];
                        count ++;
                    }
                }
            }
            SetOut(outData);
            console.log(out)
            console.log(outData);
            setWait(1);
          } else {
            alert("error, failed!");
            setWait(0);
          }
        } catch (error) {
          console.log("there is an error", error);
        }
    };

    return (
        <Container onLoad ={() => {getData("Person")}}>
            {wait === 3 ? (
              ""
            ) : wait === 2 ? (
              <div id="loading"></div>
            ) : wait === 1 ? (
                <MainContainer>
                    { outData.map(({ count, name }, i) => {
                        return (
                            <BarChartContainer key={i}>
                                <Number color={color}>{count} {name}</Number>
                                <MakeBar style = {{height : count*2}}/>
                            </BarChartContainer>
                        );
                    })}
        
                </MainContainer>
            ) : (
              "failed"
            )}
        <BlackLine />
        <select onChange ={ (e) => {getData(e.target.value)}}>
            <option value = "Person">Person</option>
            <option value = "Organisation">Organisation</option>
            <option value = "Location">Location</option>
            <option value = "Date">Date</option>
        </select>
        </Container>
    );
}