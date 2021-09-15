import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./verifyAccount.css";
import { Link } from "react-router-dom";

function VerifyAccount() {
  const [code, setCode] = useState("");
  //const [clicked, setClicked] = useState(false);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: localStorage.getItem("newEmail"),
      code: code,
    }),
  };

  // useEffect(() => {
  //   handleVerify();
  //}, [clicked]);

  const handleVerify = async () => {
    try {
      const resp = await fetch("/verify", options);
      console.log("This is what came back: ", options);

      if (resp.status === 200) {
        const data = await resp.json();
        alert("You have successfully verified your account!");
        window.location.href = "/Dashboard";
      } else {
        alert("Incorrect verification code!");
        window.location.href = "/verify";
      }
    } catch (error) {
      console.log("there is an error", error);
      window.location.href = "/verify";
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="veryify-form">
      <form onSubmit={handleSubmit}>
        <h3>Enter Confirmation Code</h3>
        <p>
          Enter the confirmation code we sent to your email.
          <em>{localStorage.getItem("newEmail")}</em>
        </p>
        <div className="form-group">
          <input
            type="text"
            placeholder="Confirmation Code"
            className="form-control"
            id="code"
            name="code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <br />
        <Link to="/dashboard">
          <button
            type="submit"
            className="btn btn-dark"
            onClick={(e) => {
              e.preventDefault();
              handleVerify();
              //setClicked(!clicked);
            }}
          >
            Next
          </button>
        </Link>
      </form>
    </div>
  );
}

export default VerifyAccount;
