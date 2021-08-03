import "./styles.css";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Text = styled.div`
  #LOC {
    background-color:orange
  }
  #DATE{
    background-color:royalblue
  }
  #PER{
    background-color:greenyellow
  }
  #ORG{
    background-color:hotpink
  }`
;

// const createMarkup = (text:string) => {
//   return { __html: <div>${text}</div> };
// };

const createText = (text: string) => {
  return <div dangerouslySetInnerHTML={{__html: text}}></div>;
};

const json = [
  {
    entity_group: "LOC",
    score: 0.9999986886978149,
    word: "Kano",
    start: 7,
    end: 12
  },
  {
    entity_group: "ORG",
    score: 0.9999964237213135,
    word: "Z",
    start: 19,
    end: 21
  },
  {
    entity_group: "PER",
    score: 0.8458274602890015,
    word: "hang",
    start: 21,
    end: 25
  },
  {
    entity_group: "DATE",
    score: 0.9999915659427643,
    word: "18 years",
    start: 39,
    end: 48
  },
  {
    entity_group: "LOC",
    score: 0.9999988675117493,
    word: "Nigeria",
    start: 52,
    end: 60
  }
];

interface OutputProps {
    data: Array<any>;
    input: string
  }

export default function Output({ data,input }: OutputProps) {
  let tex = "Emir of Kano turban Zhang wey don spend 18 years for Nigeria";
  let arr = [...input];

  console.log(arr);
  // console.log(json[0].start);
  let word = "";

  let j = 0;
  for (let i = 0; i < arr.length; i++) {
    if (j < data.length) {
      if (data[j].start === i) {
        word +=`<span id="${data[j].entity_group}">` + data[j].word + "</span>";
        i = data[j].end - 1;
        j += 1;
      } else {
        word += arr[i];
      }
    } else {
      word += arr[i];
    }
    //console.log(j,i)
  }

  console.log(word);
  const [text, setText] = useState("hello <span>dude</span>");
  return <Text className="App">{createText(word)}</Text>;
}