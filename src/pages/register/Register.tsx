import React, { useState, useEffect, Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";
import "./Register.css";
import ReCAPTCHA from "react-google-recaptcha";

function Register() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [verified, setVerified] = useState(false);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "firstname": firstName,
      "lastmame": lastName,
      "email": email,
      "password": password,
    }),
  };

  function handleSubscribe() {
    if (verified) {
      alert("You have successfully subscribed!");
    } else {
      alert("Please verify that you are human!");
    }
  }

  function enableBtn() {
    (document.getElementById("mainBtn") as HTMLInputElement).disabled = false;
  }

  useEffect(() => {
    fetch("/register", options)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.firstname);
      })
      .catch((err) => console.log(err));
  }, [clicked]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="signup-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            className="form-control"
            placeholder="Enter your first name..."
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
            placeholder="Enter your last name..."
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
            placeholder="Enter your email..."
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
            placeholder="Enter your password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br />
        <button
          id="mainBtn"
          disabled
          type="submit"
          className="btn btn-secondary"
          onClick={() => {
            setClicked(!clicked);
            handleSubscribe();
          }}
        >
          Submit
        </button>
      </form>
      <ReCAPTCHA
        sitekey="6LewewkbAAAAABw16AsxyxxNkLRnaBi0RWukXzVj"
        onChange={() => {
          setVerified(true);
          enableBtn();
        }}
        /*Server Side: 6LeJWgkbAAAAAEhHofPc5SfmLrRSALFkH5976L6T */
      />
    </div>
  );
}

export default Register;
