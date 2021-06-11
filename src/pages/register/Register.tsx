import React, { useState, useEffect, useRef, Ref } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Register.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from 'react-hook-form';


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
    '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
  );
  const validPassword = new RegExp(
    '^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$'
  );

  const validate = () => {
    if (!validEmail.test(email)){
      setEmailErr(true);
      console.log(setEmailErr);
    }else if (!validPassword.test(password)){
      setPasswordErr(true);
      console.log(setEmailErr);
    }else{
      setClicked(!clicked);
      window.location.href = "/verify";
    }
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="signup-form">
          <div id="register-header">
            <h1>MASAKHA <br/> NER TOOL</h1>
              <p>Please confirm that you are human <br />
                before submitting...</p>
               <div className="reCAP"> 
                <ReCAPTCHA
                  sitekey="6LewewkbAAAAABw16AsxyxxNkLRnaBi0RWukXzVj"
                  onChange={() => {
                    setDisabled(false);
                  }}
                />
              </div>
          </div>
      <form id="regForm" onSubmit={handleSubmit}>
      <div className="registerTop">
        <h2>SIGN UP</h2>
      </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="form-control"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="flastName"
            id="lastName"
            className="form-control"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setemail(e.target.value);
               validate() ;
            }}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validate() ;
            }}
            required
          />
        </div>
        <br />
        <div className="register-button">
        <button
          disabled={disabled}
          id="mainBtn"
          type="submit"
          className="btn btn-dark"
          //onClick={validate}
          onClick={(e) => {
            e.preventDefault();
            setClicked(!clicked);
            console.log(disabled);
            console.log(clicked);
            window.location.href = "/verify";
          }}
        >
          Sign up
        </button>
        </div>
        {Passworderr || Emailerr && <p color="red">INVALID EMAIL OR PASSWORD</p>}
      </form>
    </div>
  );
}

export default Register;
