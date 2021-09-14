import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Changepass.css";
import ReCAPTCHA from "react-google-recaptcha";
import Nav from "../../../components/nav/Nav";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Footer from "../../../components/Footer/Footer";

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
  height: 80vh;
  width: 55vw;
  border: solid 1px #ffffff;
  margin: 0 auto;
  margin-top: 80px;
`;

const Bar = styled.div`
  width: inherit;
  height: 5px;
  background-color: #000;
  margin-top: 5px;
`;

const Header = styled.h1`
  font-size: 3em;
  margin-bottom: 1em;
  @media (max-width: 767px) {
    font-size: 2em;
  }
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

const ChangepassButton = styled(Button)`
  background-color: black;
  color: white;
`;

let history;

function Register() {
  history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [clicked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [Passworderr, setPasswordErr] = useState(false);
  const [Passworderr2, setPasswordErr2] = useState(false);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      confirmPassword: password2,
    }),
  };

  const handleStatus = async () => {
    try {
      const resp = await fetch("/details/changepassword", options);
      console.log(resp);
      if (resp.status === 200) {
        alert(resp.status);
        const data = await resp.json();
        console.log(data);
        history.push("/");
      } else {
        alert(resp.status);
        alert("Incorrect email!");
      }
    } catch (error) {
      console.log("there is an error", error);
      window.location.href = "/";
    }
  };

  useEffect(() => {
    if (disabled === false) {
      fetch("/details/changepassword", options)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.output);
        })
        .catch((err) => console.log(err));
    }
  }, [clicked]);

  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );
  const validPassword = new RegExp("^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$");

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  function myFunction() {
    var x = document.getElementById("errorMSG");
      x.style.display = "block";
  }

  return (
    <>
    <Nav/>
    <Container>
    <ImageWrapper id="image4"></ImageWrapper>
    <Wrapper>
      <div>
      <h2 style={{ fontSize: "40px", color: "#1c5f22" }} id="login-header">
        Change Password
      </h2>
      <br/>
      </div>
      <form id="detForm" onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          id="email"
          className="form-control"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
          placeholder="Email address"
        />
        <Input
          type="password"
          name="oldPassword"
          id="oldPassword"
          className="form-control"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
          placeholder="New password"
        />
        <div >
        {Passworderr2 && <p color="red">PASSWORDS MUST SUE REGEX</p>}
        </div>
        <Input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          className="form-control"
          value={password2}
          placeholder="Confirm new password"
          onChange={(e) => {
            myFunction();
            setPassword2(e.target.value);
            if (password === e.target.value) {
              setPasswordErr(true);
              setDisabled(false);
            } else {
              setPasswordErr(false);
              setDisabled(true);
            }
          }}
          required
        />
        <div className="errorMSG" id="errorMSG">
        {!Passworderr && <p color="red">PASSWORDS MUST MATCH</p>}
        </div>
        <br />
            <SignUpButton
              disabled={disabled}
              id="mainBtn"
              type="submit"
              className="btn btn-dark"
              onClick={(e) => {
                e.preventDefault();
                if (!validPassword.test(password2)) {
                  setPasswordErr2(true);
                } else {
                  handleStatus();
                }
              }}
            >
              Submit
            </SignUpButton>
      </form>
      <br />
      <br />
    </Wrapper>
    </Container>
    </>
  );
}

export default Register;
