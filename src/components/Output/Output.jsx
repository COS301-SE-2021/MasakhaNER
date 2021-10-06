import "./Output.css";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Text = styled.div`
  line-height: 33px;
  color: #5f5f5f;
  transform: translate(50px, 120px);

  span {
    border-radius: 8px;
    padding: 3px;
  }

  #LOC {
    background-color: #dd9c22;
    color: #634000;

    #tag {
      width: 30px;
      color: white;
    }
  }
  #DATE {
    background-color: #2148bd;
    color: #092781;
    #tag {
      width: 30px;
      color: white;
    }
  }
  #PER {
    background-color: #79bb14;
    color: #538606;
    #tag {
      width: 30px;
      color: white;
    }
  }
  #ORG {
    background-color: #b8216d;
    color: #8d0649;
    #tag {
      width: 30px;
      color: white;
    }
  }
`;

const createText = (text) => {
  return <div dangerouslySetInnerHTML={{ __html: text }}></div>;
};

const json = [
  {
    entity_group: "LOC",
    score: 0.9999986886978149,
    word: "Kano",
    start: 7,
    end: 12,
  },
  {
    entity_group: "ORG",
    score: 0.9999964237213135,
    word: "Z",
    start: 19,
    end: 21,
  },
  {
    entity_group: "PER",
    score: 0.8458274602890015,
    word: "hang",
    start: 21,
    end: 25,
  },
  {
    entity_group: "DATE",
    score: 0.9999915659427643,
    word: "18 years",
    start: 39,
    end: 48,
  },
  {
    entity_group: "LOC",
    score: 0.9999988675117493,
    word: "Nigeria",
    start: 52,
    end: 60,
  },
];

export function CalliFrame() {
  var newEnt = localStorage.getItem("Entity");
  var linklink = "https://en.wikipedia.org/wiki/" + newEnt;
  console.log(linklink);
  return (
    <iframe src={linklink} width="750" height="250" id="wikiLink"></iframe>
  );
}

export default function Output({ data, input }) {
  let tex = "Emir of Kano turban Zhang wey don spend 18 years for Nigeria";
  let arr = [...input];

  const [ent, setEnt] = useState("");
  useEffect(() => {
    localStorage.setItem("Entity", ent);
  }, [ent]);

  let word = "";

  let nogo = true;

  let j = 0;
  if (data !== null) {
    for (let i = 0; i < arr.length; i++) {
      if (data.length === 0) {
        nogo = false;
        break;
      }
      if (j < data.length) {
        if (data[j].start === i) {
          console.log("The entity", data[j].entity_group);
          if (data[j].entity_group == "LOC" || data[j].entity_group == "LOC") {
            word +=
              ` <span id="${data[j].entity_group}"><a href="https://www.google.com/maps/place/${data[j].word}" target="_blank">` +
              data[j].word +
              `<span id="tag"}>${data[j].entity_group}</span></a></span>`;
            i = data[j].end - 1;
            j += 1;
          } else {
            word +=
              ` <span id="${data[j].entity_group}"><a href="https://en.wikipedia.org/wiki/${data[j].word}" target="_blank">` +
              data[j].word +
              `<span id="tag"}>${data[j].entity_group}</span></a></span>`;
            i = data[j].end - 1;
            j += 1;
          }
        } else {
          word += arr[i];
        }
      } else {
        word += arr[i];
      }
    }
  }

  return <Text className="App">{nogo ? createText(word) : input}</Text>;
}
