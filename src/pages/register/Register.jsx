import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import ReCAPTCHA from "react-google-recaptcha";
import styled from "styled-components";
import Login from "../../components/login/Login";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  @media only screen and (max-width: 600px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.div`
  height: 100vh;
  width: 45vw;
  background-repeat: no-repeat;
  background-color: #305c16;

  @media only screen and (max-width: 600px) {
    height: 27vh;
    width: 100vw;
  }
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

  @media only screen and (max-width: 600px) {
    height: 80vh;
    width: 100vw;
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

const LoginButton = styled.button`
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

function Register() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [Emailerr, setEmailErr] = useState(false);
  const [Passworderr, setPasswordErr] = useState(false);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstname: firstName,
      lastname: lastName,
      email: email,
      password: password,
    }),
  };

  const handleStatus = async () => {
    try {
      const resp = await fetch(
        "https://masakha-api.herokuapp.com/register",
        options
      );
      console.log(resp);
      if (resp.status === 200) {
        alert(resp.status);
        const data = await resp.json();
        console.log(data);
        window.location.href = "/verify";
      } else {
        alert(resp.status);
        alert("Incorrect verification code!");
        window.location.href = "/register";
      }
    } catch (error) {
      console.log("there is an error", error);
      window.location.href = "/";
    }
  };

  useEffect(() => {
    if (disabled === false) {
      fetch("https://masakha-api.herokuapp.com/register", options)
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
  const validPassword = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,}$"
  );

  const setItem = () => {
    localStorage.setItem("newEmail", email);
  };

  const validate = () => {
    if (!validEmail.test(email)) {
      setEmailErr(true);
      console.log(setEmailErr);
    } else if (!validPassword.test(password)) {
      setPasswordErr(true);
      console.log(setEmailErr);
    } else {
      setClicked(!clicked);
      window.location.href = "/verify";
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container>
      <ImageWrapper id="image2"></ImageWrapper>
      <Wrapper>
        <div
          id="wrapper2"
          style={{
            textAlign: "left",
            width: "30em",
            transform: "translateX(75px)",
          }}
        >
          <h2 style={{ fontSize: "50px", color: "#1c5f22" }} id="login-header">
            <span></span>
          </h2>
          <br />
        </div>
        <h2
          style={{
            fontSize: "30px",
            transform: "translateX(-110px)",
            opacity: "0.6",
          }}
        >
          Sign up
        </h2>

        <form id="regForm" onSubmit={handleSubmit}>
          <Input
            style={{ marginTop: "15px" }}
            type="text"
            name="firstName"
            className="form-control"
            value={firstName}
            placeholder="First name"
            onChange={(e) => setfirstName(e.target.value)}
            required
          />
          <Input
            type="text"
            name="flastName"
            id="lastName"
            className="form-control"
            value={lastName}
            placeholder="Last name"
            onChange={(e) => setlastName(e.target.value)}
            required
          />
          <Input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={email}
            placeholder="Email address"
            onChange={(e) => {
              setemail(e.target.value);
              validate();
            }}
            required
          />
          <Input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validate();
            }}
            required
          />
          <SignUpButton
            disabled={disabled}
            id="mainBtn"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              setItem();
              handleStatus();
            }}
          >
            Sign up
          </SignUpButton>
          {Passworderr ||
            (Emailerr && <p color="red">INVALID EMAIL OR PASSWORD</p>)}
        </form>

        <p>
          Please confirm that you are human <br />
          before submitting...
        </p>
        <ReCAPTCHA
          sitekey="6LewewkbAAAAABw16AsxyxxNkLRnaBi0RWukXzVj"
          onChange={() => {
            setDisabled(false);
          }}
        />
      </Wrapper>
    </Container>
  );
}

export default Register;
