import { useState, useEffect } from "react";
import styled from "styled-components";

const Text = styled.div`
  line-height: 33px;
  color: #5f5f5f;

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

const createText = (text: string) => {
  return <div dangerouslySetInnerHTML={{ __html: text }}></div>;
};

interface OutputProps {
  data: Array<any> | null;
  input: string;
}

export function CalliFrame() {
  var newEnt = localStorage.getItem("Entity");
  var linklink = "https://en.wikipedia.org/wiki/" + newEnt;
  console.log(linklink);
  return (
    <iframe src={linklink} width="750" height="250" id="wikiLink"></iframe>
  );
}

export default function Dropdown({ data, input }: OutputProps) {
  let tex = "Emir of Kano turban Zhang wey don spend 18 years for Nigeria";
  let arr = [...input];

  const [ent, setEnt] = useState("");
  useEffect(() => {
    localStorage.setItem("Entity", ent);
  }, [ent]);

  let word = "";
  let feed = "";
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
          console.log("The entity", data[j].entity);
          if (data[j].entity == "B-LOC" || data[j].entity == "I-LOC") {
            word +=
              ` <span id="${data[j].entity.substring(
                2
              )}"><a href="https://www.google.com/maps/place/${
                data[j].word
              }" target="_blank">` +
              data[j].word +
              `<span id="tag"}>${data[j].entity.substring(
                2
              )}</span></a><select name="entity" id="EntName"><option value="<LOC>">LOC</option><option value="<PER>">PER</option><option value="<ORG>">ORG</option><option value="<DAT>">DATE</option></select></span>`;
            i = data[j].end - 1;
            j += 1;
            if ((document.getElementById("EntName") as HTMLInputElement).value != null){
              feed += (document.getElementById("EntName") as HTMLInputElement).value;
            }
          } else {
            word +=
              ` <span id="${data[j].entity.substring(
                2
              )}"><a href="https://en.wikipedia.org/wiki/${
                data[j].word
              }" target="_blank">` +
              data[j].word +
              `<span id="tag"}>${data[j].entity.substring(
                2
              )}</span></a><select name="entity"><option value="<LOC>">LOC</option><option value="<PER>">PER</option><option value="<ORG>">ORG</option><option value="<DAT>">DATE</option></select></select></span>`;
            i = data[j].end - 1;
            j += 1;
            if ((document.getElementById("EntName") as HTMLInputElement).value != null){
              feed += (document.getElementById("EntName") as HTMLInputElement).value;
            }
          }
        } else {
          word += arr[i];
        }
      } else {
        word += arr[i];
      }
      console.warn("Word: ", word);
      console.warn("Feedback: ", feed);
    }
  }

  console.log(word);
  const [text, setText] = useState("hello <span>dude</span>");
  return <Text className="App">{nogo ? createText(word) : input}</Text>;
}
