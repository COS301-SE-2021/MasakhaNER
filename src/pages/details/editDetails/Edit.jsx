import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Edit.css";
import Nav from "../../../components/nav/Nav";
import Footer from "../../../components/Footer/Footer";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImageWrapper = styled.div`
  height: 100vh;
  width: 45vw;
  background-repeat: no-repeat;
  background-color: #305c16;
`;

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 55vw;
  border: solid 1px #ffffff;
  margin: 0 auto;
  align-self: flex-end;
`;

const Input = styled.input`
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  height: 35px;
  width: 20em;
  padding: 15px;

  &:hover {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
    transition: 0.4s;
  }

  &:focus {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1);
  }
`;

const Button = styled.button`
  border: solid 1px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  width: 10em;
  background-color: white;
  border-radius: 5px;
  height: 35px;
  width: 20em;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1);
  &:hover {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
    transition: 0.4s;
    border-radius: 5px;
  }
`;

const SignUpButton = styled(Button)`
  background-color: #1c5f22;
  border: solid 1px #1c5f22;
  color: white;
  &:hover {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
    transition: 0.4s;
    border-radius: 5px;
    background-color: #34833b;
    border: solid 1px #34833b;
  }
`;

function Register() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [clicked] = useState(false);
  const [disabled] = useState(true);
  const [Emailerr] = useState(false);
  const [Passworderr] = useState(false);

  const options = {
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

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div id="detailspage">
      <Nav />
      <Container>
        <Wrapper>
          <form id="detForm" onSubmit={handleSubmit}>
            <h2
              style={{ fontSize: "30px", color: "#1c5f22" }}
              id="login-header"
            >
              Edit details
            </h2>
            <Input
              style={{ marginTop: "15px" }}
              className="form-control"
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              required
              placeholder="First name"
            />
            <Input
              type="text"
              name="flastName"
              value={lastName}
              className="form-control"
              onChange={(e) => setlastName(e.target.value)}
              required
              placeholder="Last name"
            />
            <br />
            <div className="submit-button">
              <SignUpButton
                id="mainBtn"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  handleStatus();
                }}
              >
                Submit
              </SignUpButton>
            </div>
            {Passworderr ||
              (Emailerr && <p color="red">INVALID EMAIL OR PASSWORD</p>)}
          </form>
        </Wrapper>
        <ImageWrapper id="image3"></ImageWrapper>
      </Container>
    </div>
  );
}

export default Register;
