import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import "./InputSection.css";
import Output from "../Output/Output";
import styled from "styled-components";
import Modal from "react-modal";
import { useHistory } from "react-router-dom";

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
    transform: translate(61vw, -65px);
  }
`;

const Input = styled.textarea`
  display: inline-block;
  border-radius: 10px;
  width: 85vw;
  height: 4em;
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

const Visualizer = styled.div`
  background-color: #d8d8d8;
  color: grey;
  transform: translate(0px, -890px);
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

  let subtitle: any;
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

  const handleChange = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  }

  const handleFeedback = async () => {
    const opts: any = {
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
      const resp = await fetch("/feedback", opts);
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

  var history: any[] = new Array();
  const addToHistory = (data: String) => {
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

  const options: any = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({ input: input }),
  };

  useEffect(() => {
    fetch("/input", options)
      .then((res) => res.json())
      .then((data) => {
        setOutputData(data.output);
      })
      .catch((err) => console.log(err));
  }, [clicked]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleSend = async () => {
    addToHistory(input);
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

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    const reader: any = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      setFileName(file.name);
      setFileContent(reader.result);
      setInput(reader.result);
    };
  };

  const handleImageFile = (e: any) => {
    const file = e.target.files;
    console.log(file, "$$$$");

    const reader = new FileReader();
    reader.readAsDataURL(file[0]);
    setImageFile(e.target.result);
    console.log("THIS IS IT 2", imageFile);

    reader.onload = (e) => {
      localStorage.setItem("image", e.target.result as string);
    };
  };

  const handleImageUpload = async () => {
    console.log("THIS IS IT", imageFile);
    setWait(2);
    const opts: any = {
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
      const resp = await fetch("/upload-image", opts);
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

  return (
    <>
      <FormContainer>
        <div style={{ height: "0px" }} id="inputsection">
          <form style={{ height: "0px" }} onSubmit={handleSubmit}>
            <Input
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
              />
              <Button onClick={handleSend}>Send</Button>
            </div>
            <ImageUploadHeader id="image-upload-header">
              <h1>Facial Recognition</h1>
              <p>
                Built with the power of OpenCV, this facial recognition system
                was built and trained with the faces of popular African figures.{" "}
                <br />
                <br /> Upload an image of an Africa figure and submit to see the
                results.
              </p>
            </ImageUploadHeader>
            <div
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
            </div>
          </form>
        </div>
        <div id="output-section">
          <OutputSection>
            {wait === 3 ? (
              ""
            ) : wait === 2 ? (
              <div id="loading"></div>
            ) : wait === 1 ? (
              <Output data={outputData} input={input2} />
            ) : (
              "failed"
            )}
          </OutputSection>
          <div
            id="button-container"
            style={{ transform: "translate(1080px, -400px)" }}
          >
            <Button onClick={openModal}>Feedback</Button>
          </div>
        </div>
        <div></div>
      </FormContainer>
      <h1
        style={{
          color: "#1c5f22",
          transform: "translate(0px, -900px)",
          opacity: "0.7",
        }}
      >
        Data Visualizer
      </h1>
      <p
        style={{
          color: "#000",
          transform: "translate(0px, -900px)",
          opacity: "0.6",
        }}
      >
        Displays the most passed in words and their corresponding entities
      </p>
      <Visualizer>
        <p>Sean Nkosi</p>
      </Visualizer>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Feedback</h2>
        <Button onClick={closeModal}>close</Button>
        <div>
          <Output data={outputData} input={input2} />
          <p>
            If returned data is incorrect please provide the correct entity by
            placing the entity next to the incorrect output. i.e Name {"<PER>"}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <FeedbackInput
            value={feedback}
            placeholder="Enter feedback"
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
          />
          <br />
          <Button
            onClick={(e) => {
              e.preventDefault();
              handleFeedback();
              closeModal();
            }}
          >
            Send Feedback
          </Button>
        </form>
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
