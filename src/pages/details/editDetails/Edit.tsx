import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Edit.css";
import Nav from "../../../components/nav/Nav";
import Footer from "../../../components/Footer/Footer";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 55vw;
  border: solid 1px #ffffff;
  margin: 0 auto;
  margin-top: 80px;

  #wrapper2 {
    h2 {
      span:before {
        content: "";
        animation: animate infinite 10s;
      }

      @keyframes animate {
        0% {
          content: "Kuanza.";
        }
        25% {
          content: "Get started.";
        }
        50% {
          content: "Bẹ̀rẹ̀.";
        }
        75% {
          content: "Tanga.";
        }
        100% {
          content: "Qalisa.";
        }
      }
    }
  }
`;

const Input = styled.input`
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  height: 35px;
  width: 15em;
  padding: 15px;

  &:hover {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
    transition: 0.4s;
  }

  &:focus {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1);
  }
`;

const Button = styled.button`
  border: solid 1px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  width: 10em;
  background-color: black;
  color: white;
  border-radius: 20px;
  height: 35px;
  width: 15em;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1);
  &:hover {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
    transition: 0.4s;
  }
`;

const Bar = styled.div`
  width: inherit;
  height: 5px;
  background-color: #000;
  margin-top: 5px;
`;

function Register() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [clicked] = useState(false);
  const [disabled] = useState(true);
  const [Emailerr] = useState(false);
  const [Passworderr] = useState(false);

  const options: any = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access-token": localStorage.getItem("token"),
    },
    body: JSON.stringify({
      firstname: firstName,
      lastname: lastName,
    }),
  };

  const handleStatus = async () => {
    try {
      const resp = await fetch("/update-details", options);
      console.log(resp);
      if (resp.status === 200) {
        alert(resp.status);
        const data = await resp.json();
        console.log(data);
      } else {
        alert(resp.status);
        alert("Incorrect verification code!");
      }
    } catch (error) {
      console.log("there is an error", error);
    }
  };

  useEffect(() => {
    if (disabled === false) {
      fetch("/register", options)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.output);
        })
        .catch((err) => console.log(err));
    }
  }, [clicked]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div id="detailspage">
      <Nav />
      <Wrapper>
        <form id="detForm" onSubmit={handleSubmit}>
          <h2>Edit Details</h2>
          <Bar />
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <Input
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              required
              placeholder="Enter your first name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <Input
              type="text"
              name="flastName"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              required
              placeholder="Enter your last name"
            />
          </div>
          <br />
          <div className="submit-button">
            <Button
              id="mainBtn"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleStatus();
              }}
            >
              Submit
            </Button>
          </div>
          {Passworderr ||
            (Emailerr && <p color="red">INVALID EMAIL OR PASSWORD</p>)}
        </form>
      </Wrapper>
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Register;
