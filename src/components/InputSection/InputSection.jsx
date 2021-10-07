import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import "./InputSection.css";
import Output from "../Output/Output";
import styled from "styled-components";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";
import Tesseract from "tesseract.js";
import Visualizer from "../visualizer/Visualizer";

const FeedInput = styled.input`
  border: solid 1px rgba(0, 0, 0, 0.2);
  height: 35px;
  width: 20em;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
`;

const FeedSelect = styled.select`
  border: solid 1px rgba(0, 0, 0, 0.2);
  height: 35px;
  width: 5em;
  padding: 5px;
  border-radius: 5px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1);
`;

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  padding-bottom: 600px;
  #button-container {
    margin-top: 10px;
    padding-right: 6em;
    display: flex;
    width: 25em;
    justify-content: space-between;
    transform: translate(61vw, -190px);
  }
`;

const Input = styled.textarea`
  display: inline-block;
  border-radius: 10px;
  width: 60vw;
  height: 12em;
  resize: none;
  text-align: justify;
  padding: 20px;
  border-radius: 20px;
  border: solid 0.1px rgba(153, 153, 153, 0.1);
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.05);
  position: relative;

  &:focus {
    outline: none;
  }
`;

const TextInput = styled.textarea`
  display: inline-block;
  border-radius: 10px;
  width: 60vw;
  height: 12em;
  resize: none;
  text-align: justify;
  padding: 20px;
  border-radius: 20px;
  border: solid 0.1px rgba(153, 153, 153, 0.1);
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.05);
  position: relative;

  &:focus {
    outline: none;
  }
`;

const FBInput = styled.textarea`
  border: 0;
  outline: 0;
  background: transparent;
  border-bottom: 1px solid black;
`;

const OutputSection = styled.div`
  display: inline-block;
  border-radius: 10px;
  width: 70em;
  height: 25em;
  resize: none;
  text-align: justify;
  padding: 20px;
  border-radius: 20px;
  /* border: solid 0.1px rgba(153, 153, 153, 0.1); */
  /* box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.05); */
  position: relative;

  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  border: solid 0.1px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  background-color: #1c5f22;
  border-radius: 5px;
  height: 35px;
  padding-left: 1em;
  padding-right: 1em;
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.05);
  &:hover {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
    transition: 0.4s;
    background-color: #34833b;
    border: solid 1px #34833b;
  }
  position: relative;
  color: white;
`;

const Upload = styled.input`
  border: solid 0.1px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  background-color: white;
  border-radius: 20px;
  z-index: 1;
  height: 35px;
  padding-left: 1em;
  padding-right: 1em;
  width: 8em;
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.05);
  &:hover {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
    transition: 0.4s;
  }
  position: relative;
  color: #5f5f5f;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "60%",
  },
};

const FeedbackInput = styled(Input)`
  height: 6em;
  width: 100%;
  margin-bottom: 20px;
`;

const Visualizered = styled.div`
  /* background-color: #f7f7f7; */
  color: grey;
  transform: translate(0px, -590px);
  width: 1000px;
  height: 300px;
`;

const ImageUploadHeader = styled.div`
  width: 105vw;
  height: 450px;
  border-radius: 5px;
  padding: 20px;
  background-color: #1c5f22;
  transform: translate(-10vw, 600px);

  h1 {
    /* color: #7eaf82; */
    color: #fff;
    transform: translate(88px, 20px);
  }

  p {
    /* padding: 20px; */
    color: #fff;
    opacity: 1;
    width: 500px;
    margin-top: 30px;
    transform: translate(88px, 0px);
  }

  a {
    opacity: 1;
    color: #7eaf82;
  }
`;

const Space = styled.div`
  height: 200px;
`;

const TextUploadHeader = styled.div`
  width: 105vw;
  height: 350px;
  border-radius: 5px;
  padding: 20px;
  background-color: #1c5f22;
  transform: translate(-110px, 0px);

  h1 {
    color: #7eaf82;
  }
`;

export default function InputSection() {
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [clicked] = useState(false);
  const [outputData, setOutputData] = useState(null);
  const [wait, setWait] = useState(3);
  const [, setFileName] = useState("");
  const [, setFileContent] = useState("");
  const [feedback, setFeedback] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [baseFile, setBaseFile] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
  const [inputList, setInputList] = useState([
    { feedbackInput: "", feedbackEnt: "" },
  ]);

  // handle input change

  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [imageIsOpen, setImageIsOpen] = useState(false);
  const closeImage = () => {
    setImageIsOpen(false);
  };
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#444444";
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    setImagePath(URL.createObjectURL(e.target.files[0]));
  };

  const handleFeedback = async () => {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        feedback: feedback,
      }),
    };

    try {
      const resp = await fetch(
        "https://masakha-api.herokuapp.com/feedback",
        opts
      );
      console.log(resp);
      if (resp.status === 200) {
      } else {
        alert("error, failed!");
      }
      console.log(wait);
    } catch (error) {
      console.log("there is an error", error);
    }
  };
  let his;
  his = useHistory();

  const visualizer = () => {
    his.push("/visualizer");
  };

  var history = new Array();
  const addToHistory = (data) => {
    history.push(data);
    let stored = localStorage.getItem("history");
    if (stored == null) {
      localStorage.setItem("history", history.toString());
    } else {
      history = new Array();
      history = stored.split(",");
      history.push(data);
      if (history.length > 5) history.shift();
      localStorage.setItem("history", history.toString());
    }
    console.log(history);
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({ input: input }),
  };

  useEffect(() => {
    fetch("https://masakha-api.herokuapp.com/input", options)
      .then((res) => res.json())
      .then((data) => {
        setOutputData(data.output);
      })
      .catch((err) => console.log(err));
  }, [clicked]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSend = async () => {
    addToHistory(input);
    setWait(2);
    const opts = {
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
      const resp = await fetch("https://masakha-api.herokuapp.com/input", opts);
      console.log(resp);
      if (resp.status === 200) {
        const data = await resp.json();
        console.log(data);
        setOutputData(data.output);
        setInput2(input);
        console.log("data is ", data.output);
        setWait(1);
      } else {
        alert("error, failed!");
        setWait(0);
      }
      console.log(wait);
    } catch (error) {
      console.log("there is an error", error);
      history.push("/");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      setFileName(file.name);
      setFileContent(reader.result);
      setInput(reader.result);
    };
  };

  const FbOpts = [
    { value: "ORG", label: "Organization" },
    { value: "LOC", label: "Location" },
    { value: "PER", label: "Person" },
  ];

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    console.warn("Output: ", e.target.name);
    const list = [...inputList];
    if (e.target.name == "feedbackInput") {
      list[index]["feedbackInput"] = value;
    } else {
      list[index]["feedbackEnt"] = value;
    }
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { feedbackInput: "", feedbackEnt: "" }]);
  };

  // console.log("THSI IS FILE ANME ",filename)
  // console.log("THSI IS FILE CONTENT ",filecontent);
  const handleImageFile = (e) => {
    const file = e.target.files;
    // console.log(file, "$$$$");

    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    setImageFile(e.target.result);
    console.log("THIS IS IT 2", imageFile);

    reader.onload = (e) => {
      localStorage.setItem("image", e.target.result);
    };
  };

  const handleClick = () => {
    Tesseract.recognize(imagePath, "eng", {
      logger: (m) => console.log(m),
    })
      .catch((err) => {
        console.error(err);
      })
      .then((result) => {
        // Get Confidence score
        let confidence = result.confidence;
        console.log("RESULT:", result);

        let text = result.data.text;
        setText(text);
        setText(result.text);
        setInput(result.data.text);
        console.warn("AI TEXT:", text);
        console.warn("AI CON:", confidence);
      });
  };

  console.warn("AI TEXT 2:", text);

  const handleImageUpload = async () => {
    console.log("THIS IS IT", imageFile);
    setWait(2);
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        image: localStorage.getItem("image"),
      }),
    };

    try {
      const resp = await fetch(
        "https://masakha-api.herokuapp.com/upload-image",
        opts
      );
      console.log(resp);
      if (resp.status === 200) {
        // alert(resp.status);
        const data = await resp.json();

        // alert(data.msg);
        console.log(data.msg);
        var text = data.msg.substring(2);
        text = text.substring(0, text.length - 1);
        setBaseFile("data:image/jpg;base64, " + text);
        setWait(1);
      } else {
        alert("error, failed!");
        setWait(0);
      }
      console.log(wait);
    } catch (error) {
      console.log("there is an error", error);
    }
  };

  function concatFeedback() {
    let inputText = input;
    console.warn("hello", inputText);
    for (let index = 0; index < inputList.length; index++) {
      let feedText = inputList[index]["feedbackInput"];
      let feedEnt = inputList[index]["feedbackEnt"];
      let feedBack = feedText + feedEnt;
      feedText.toUpperCase();
      inputText.toUpperCase().replace(feedText, feedBack);
    }
    setFeedback(inputText);
    console.warn("Feedback: ", feedback);
  }

  return (
    <>
      <FormContainer>
        <div style={{ height: "0px" }} id="inputsection">
          <form style={{ height: "0px" }} onSubmit={handleSubmit}>
            <TextInput
              placeholder="Type here..."
              id="testSection"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div id="button-container">
              <input
                type="file"
                placeholder="Upload"
                onChange={handleFileChange}
                id="getText"
                style={{ display: "none" }}
              />
              <Button
                onClick={() => document.getElementById("getText").click()}
              >
                Upload Textfile
              </Button>
              <Button onClick={handleSend}>Send</Button>
            </div>
            <div id="button-container">
              <input
                type="file"
                id="getFile"
                onChange={handleChange}
                style={{ display: "none" }}
              />
              <Button
                onClick={() => document.getElementById("getFile").click()}
              >
                Upload Image
              </Button>
              <Button onClick={handleClick} style={{ width: "105px" }}>
                Convert
              </Button>
            </div>
            {/* <ImageUploadHeader id="image-upload-header"> */}
            {/* <ImageUploadHeader id="image-upload-header">
              <h1>Facial Recognition</h1>
              <p>
                Built with the power of OpenCV, this facial recognition system
                was built and trained with the faces of popular African figures.{" "}
                <br />
                <br /> Upload an image of an Africa figure and submit to see the
                results.
              </p>
            </ImageUploadHeader> */}
            {/* <div
              style={{
                transform: "translate(0px,440px)",
                zIndex: 99,
              }}
            >
              <input
                style={{ color: "white", marginBottom: "10px" }}
                type="file"
                name="fileUpload"
                value={imageFile}
                onChange={(e) => handleImageFile(e)}
              />
              <Button
                onClick={() => {
                  handleImageUpload();
                  setImageIsOpen(true);
                }}
              >
                Submit
              </Button>
            </div> */}
          </form>
        </div>
        <div id="output-section">
          <OutputSection>
            {wait === 3 ? (
              ""
            ) : wait === 2 ? (
              <p
                style={{ transform: "translate(50px, -120px)", height: "0px" }}
              >
                loading...
              </p>
            ) : wait === 1 ? (
              <Output data={outputData} input={input2} />
            ) : (
              "failed"
            )}
          </OutputSection>
          <div
            id="button-container"
            style={{ transform: "translate(1080px, -100px)" }}
          >
            <Button onClick={openModal}>Feedback</Button>
          </div>
        </div>
      </FormContainer>
      <h1
        style={{
          color: "#1c5f22",
          transform: "translate(0px, -500px)",
          opacity: "0.7",
          fontSize: "30px",
        }}
      >
        Data Visualizer
      </h1>
      <p
        style={{
          color: "#000",
          transform: "translate(0px, -500px)",
          opacity: "0.6",
        }}
      >
        Displays the most passed in words and their corresponding entities
      </p>
      <Visualizered>
        <Visualizer />
      </Visualizered>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Feedback</h2>
        <Button onClick={closeModal}>close</Button>
        <div style={{ height: "40px" }} />
        <div>
          <div style={{ transform: "translate(-50px, 70px)" }}>
            <Output data={outputData} input={input2} />
          </div>
          <p>
            If returned data is incorrect please provide the correct entity by
            placing the entity next to the incorrect output. i.e Name {"<PER>"}
          </p>
        </div>
        <br />
        {inputList.map((x, i) => {
          return (
            <form onSubmit={handleSubmit}>
              <div>
                <FeedInput
                  placeholder="Type here..."
                  type="text"
                  name="feedbackInput"
                  value={x.feedbackInput}
                  onChange={(e) => handleInputChange(e, i)}
                />
                <FeedSelect
                  name="feedbackEnt"
                  value={x.feedbackEnt}
                  onChange={(e) => handleInputChange(e, i)}
                >
                  <option></option>
                  <option value="<LOC>">LOC</option>
                  <option value="<PER>">PER</option>
                  <option value="<DAT>">DAT</option>
                  <option value="<ORG>">ORG</option>
                </FeedSelect>
                <div className="btn-box">
                  {inputList.length !== 1 && (
                    <Button
                      className="mr10"
                      onClick={() => handleRemoveClick(i)}
                    >
                      Remove
                    </Button>
                  )}
                  {inputList.length - 1 === i && (
                    <Button onClick={handleAddClick}>Add</Button>
                  )}
                </div>
              </div>
            </form>
          );
        })}
        <Button
          onClick={(e) => {
            e.preventDefault();
            concatFeedback();
            handleFeedback();
            closeModal();
          }}
        >
          Send Feedback
        </Button>
        {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
      </Modal>
      <Modal
        isOpen={imageIsOpen}
        onRequestClose={closeImage}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {wait === 3 ? (
          ""
        ) : wait === 2 ? (
          <div id="loading"></div>
        ) : wait === 1 ? (
          <img width="100%" height="90%" src={baseFile} />
        ) : (
          "failed"
        )}
        <Button onClick={closeImage}>close</Button>
      </Modal>
    </>
  );
}
