import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./resetVerify.css";
import { Link } from "react-router-dom";

function VerifyReset() {
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
  function handleVerify(){
    window.location.href = "/changePassword";
  }

  // const handleVerify = async () => {
  //   try {
  //     const resp = await fetch("/resetVerify", options);
  //     console.log("This is what came back: ", options);

  //     if (resp.status === 200) {
  //       const data = await resp.json();
  //       window.location.href = "/";
  //     } else {
  //       alert("Incorrect verification code!");
  //       window.location.href = "/resetVerify";
  //     }
  //   } catch (error) {
  //     console.log("there is an error", error);
  //     window.location.href = "/resetVerify";
  //   }
  // };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="verify-form">
      <form onSubmit={handleSubmit}>
        <h3>Enter Reset Code</h3>
        <p>
          Enter the reset code we sent to your email.
          <em>{localStorage.getItem("newEmail")}</em>
        </p>
        <div className="form-grp">
          <input
            type="text"
            placeholder="Reset Code"
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
            className="next"
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

export default VerifyReset;