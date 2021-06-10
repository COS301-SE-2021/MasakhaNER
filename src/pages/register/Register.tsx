import React, { useState, useEffect, Component, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import "./Register.css";
import ReCAPTCHA from "react-google-recaptcha";
import { Link } from "react-router-dom";

function Register() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [disabled, setDisabled] = useState(true);

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    
    <div className="signup-form">
          <div id="register-header"><h1>Masakha NER Tool</h1></div>
      <form id="regForm" onSubmit={handleSubmit}>
      <div className="registerTop">
        <h2>Sign Up</h2>
      </div>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="form-control"
            placeholder="Firstname"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            name="flastName"
            id="lastName"
            className="form-control"
            placeholder="Lastname"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="emal"
            id="email"
            className="form-control"
            placeholder="Email address"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <p>Please confirm that you are human before submitting</p>
        <ReCAPTCHA
          sitekey="6LewewkbAAAAABw16AsxyxxNkLRnaBi0RWukXzVj"
          onChange={() => {
            setDisabled(false);
          }}
        />
        <br />
        <div className="register-button">
        <button
          disabled={disabled}
          id="mainBtn"
          type="submit"
          className="btn btn-dark"
          onClick={(e) => {
            e.preventDefault();
            setClicked(!clicked);
            console.log(disabled);
            console.log(clicked);
            window.location.href = "/verify";
          }}
        >
          Sign Up
        </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
