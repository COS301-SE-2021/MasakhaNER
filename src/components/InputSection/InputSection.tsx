import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import "./InputSection.css";
import Output from "../Output/Output";
import styled from "styled-components";
import Modal from "react-modal";

const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  #button-container {
    margin-top: 10px;
    padding-right: 6em;
    display: flex;
    width: 25em;
    justify-content: space-between;
  }
`;

const Input = styled.textarea`
  display: inline-block;
  border-radius: 10px;
  width: 25em;
  height: 16em;
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
  width: 25em;
  height: 16em;
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

const Button = styled.button`
  border: solid 0.1px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  background-color: white;
  border-radius: 20px;
  height: 35px;
  padding-left: 1em;
  padding-right: 1em;
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

const Upload = styled.input`
  border: solid 0.1px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  background-color: white;
  border-radius: 20px;
  height: 35px;
  padding-left: 1em;
  padding-right: 1em;
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

const Link = styled.div`
  background-color: white;
  display: grid;
  flex-direction: column;
  justify-content: center;
  height: 43vh;
  width: 51vw;
  border: solid 1px #ffffff;
  margin: 0 auto;
  margin-bottom: 8vh;
  border-radius: 20px;
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.05);
  padding: 2rem;
  h4 {
    color: #5f5f5f;
  }
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

export default function InputSection() {
  const [input, setInput] = useState("");
  const [input2, setInput2] = useState("");
  const [clicked, setClicked] = useState(false);
  const [outputData, setOutputData] = useState(null);
  const [wait, setWait] = useState(3);
  const [up, setUp] = useState(false);
  const [filename, setFileName] = useState("");
  const [filecontent, setFileContent] = useState("");

  let subtitle: any;
  const [modalIsOpen, setIsOpen] = useState(false);

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

  var history : String[] = new Array();
  const addToHistory = (data: String ) => {
    history.push(data);
    let stored = localStorage.getItem('history');
    if(stored == null){
      localStorage.setItem('history', history.toString());
    }
    else{
      history = new Array();
      history = stored.split(",");
      history.push(data);
      if(history.length > 5) history.shift();
      localStorage.setItem('history', history.toString());
    }
    console.log(history);
  }

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

  var newEnt = localStorage.getItem('Entity');
  var linklink = 'https://en.wikipedia.org/wiki/' + newEnt;
  console.log(linklink);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  
  const handleSend = async () => {
    addToHistory(input)
    setWait(2);
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        //"x-access-token": localStorage.getItem("token"),
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
        // localStorage.setItem("token", data.token);
        // localStorage.setItem("isAuthenticated", "true");
        setOutputData(data.output);
        setInput2(input)
        console.log("data is ", data.output);
        // if (data.isadmin) {
        //   history.push("/Admin");
        // } else {
        //   history.push("/Dashboard");
        // }
        setWait(1);
      } else {
        alert("error, failed!");
        setWait(0);
        //history.push("/");
      }
      console.log(wait);
    } catch (error) {
      console.log("there is an error", error);
      history.push("/");
    }
  };

  // console.log(history);
  

  const handleFileChange = (e: any) =>{
    
    const file = e.target.files[0];
    const reader : any = new FileReader();
   //console.log("NAME",file.name)
    reader.readAsText(file);
    reader.onload = () => {
      //console.log("running")
      setFileName(file.name);
      
      setFileContent(reader.result);
      //console.log("RESULT",typeof(reader.result))
      setInput(reader.result)
      
    }

    
    
  }
  // console.log("THSI IS FILE ANME ",filename)
  // console.log("THSI IS FILE CONTENT ",filecontent);
  
  return (
    <>
      <FormContainer>
        <div>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder="Type here..."
              id="testSection"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <div id="button-container">
              <Button onClick={() => setClicked(!clicked)}>Mic</Button>
              <Upload type="file" placeholder="Upload" onChange={handleFileChange}/>
              <Button onClick={handleSend}>Send</Button>
            </div>
          </form>
        </div>
        <div>
          <OutputSection>
            {wait===3?"":wait===2?"pending...":wait===1?<Output data={outputData} input={input2}/>:"failed"}
          </OutputSection>
          <div id="button-container">
            <Button onClick={openModal}>Feedback</Button>
          </div>
      </div>
      <div>
        <Link>
          <h4>Link Section</h4>
          <iframe src={linklink}  width="750" height="250" id="wikiLink"></iframe>
        </Link>
      </div>
    </FormContainer>
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
        </div>
        <form>
          <FeedbackInput />
          <br />
          <Button>Send Feedback</Button>
        </form>
      </Modal>
    </>
  );
}
