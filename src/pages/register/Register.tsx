import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import ReCAPTCHA from "react-google-recaptcha";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 80vw;
  border: solid 1px #ffffff;
  margin: 0 auto;
  margin-top: 8vh;
  border-radius: 20px;
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.2);
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
  background-color: white;
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

const SignUpButton = styled(Button)`
  background-color: black;
  color: white;
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
      const resp = await fetch("/register", options);
      console.log(resp);
      if (resp.status === 200) {
        alert(resp.status);
        const data = await resp.json();
        console.log(data);
        window.location.href = "/verify";
      } else {
        alert(resp.status);
        alert("Incorrect verification code!");
        window.location.href = "/";
      }
    } catch (error) {
      console.log("there is an error", error);
      window.location.href = "/";
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

  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );
  const validPassword = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$");

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
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <Wrapper>
      <Header>
        MasakhaNER
        <Bar />
      </Header>

      <form id="regForm" onSubmit={handleSubmit}>
        <div>
          <h2>SIGN UP</h2>
        </div>
        <label>First name</label>
        <Input
          type="text"
          name="firstName"
          className="form-control"
          value={firstName}
          placeholder="Enter your first name"
          onChange={(e) => setfirstName(e.target.value)}
          required
        />
        <label htmlFor="lastName">Last name</label>
        <Input
          type="text"
          name="flastName"
          id="lastName"
          className="form-control"
          value={lastName}
          placeholder="Enter your last name"
          onChange={(e) => setlastName(e.target.value)}
          required
        />
        <label htmlFor="email">Email address</label>
        <Input
          type="email"
          name="email"
          id="email"
          className="form-control"
          value={email}
          placeholder="Enter your email address"
          onChange={(e) => {
            setemail(e.target.value);
            validate();
          }}
          required
        />
        <label>Password</label>
        <Input
          type="password"
          name="password"
          id="password"
          className="form-control"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            validate();
          }}
          required
        />
        <Button
          disabled={disabled}
          id="mainBtn"
          type="submit"
          className="btn btn-dark"
          onClick={(e) => {
            e.preventDefault();
            setItem();
            handleStatus();
          }}
        >
          Sign up
        </Button>
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
  );
}

export default Register;
