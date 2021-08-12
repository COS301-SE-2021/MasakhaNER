import "./Output.css";
import { useState } from "react";
import styled from "styled-components";

const Text = styled.div`
  line-height: 33px;
  color: #5f5f5f;

  span {
    border-radius: 8px;
    padding: 3px;
  }

  #LOC {
    background-color: #ffcb69;
    color: #634000;

    #tag {
      width: 30px;
      color: white;
    }
  }
  #DATE {
    background-color: #7793e9;
    color: #092781;
    #tag {
      width: 30px;
      color: white;
    }
  }
  #PER {
    background-color: #f16f6f;
    color: #610707;
    #tag {
      width: 30px;
      color: white;
    }
  }
  #ORG {
    background-color: #eb88b9;
    color: #8d0649;
    #tag {
      width: 30px;
      color: white;
    }
  }
`;

// function wikiSearch(entity1){

// }


const createText = (text: string) => {
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

interface OutputProps {
  data: Array<any> | null;
  input: string;
}

export default function Output({ data, input }: OutputProps) {
  let tex = "Emir of Kano turban Zhang wey don spend 18 years for Nigeria";
  let arr = [...input];

  console.log(data);
  // console.log(json[0].start);
  let word = "";
  //data = json;
  let j = 0;
  if (data !== null) {
    for (let i = 0; i < arr.length; i++) {
      if (j < data.length) {
        if (data[j].start === i) {
          word +=
            ` <span id="${data[j].entity.substring(2)}">` +
            data[j].word +
            `<span id="tag"><a href="https://en.wikipedia.org/wiki/${data[j].word}">${data[j].entity.substring(2)}</a></span></span>`;
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
  }

  console.log(word);
  const [text, setText] = useState("hello <span>dude</span>");
  return <Text className="App">{createText(word)}</Text>;
}
