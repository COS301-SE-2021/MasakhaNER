import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Changepass.css";
import ReCAPTCHA from "react-google-recaptcha";
import Nav from "../../../components/nav/Nav";
import Footer from "../../../components/Footer/Footer";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [clicked, setClicked] = useState(false);
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
      password: password
    }),
  };

  const handleStatus = async () => {
    try {
      const resp = await fetch("/reset", options);
      console.log(resp);
      if (resp.status === 200) {
        alert(resp.status);
        const data = await resp.json();
        console.log(data);
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
      fetch("/reset", options)
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

  return (
    <div id="detailspage">
      <Nav />
      <div className="signup-form">
      <form id="detForm" onSubmit={handleSubmit}>
        <div className="registerTop">
          <h2>Change Password</h2>
        </div>
        <div className="form-group">
          <label htmlFor="oldPassword">email:</label>
          <input
            type="email"
            name="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
        <div className="form-group">
          <label htmlFor="newPassword">New password:</label>
          <input
           type="password"
           name="oldPassword"
           id="oldPassword"
           className="form-control"
           value={password}
           onChange={(e) => {
             setPassword(e.target.value);
           }}
           required
          />
          {Passworderr2 && <p color="red">PASSWORDS MUST SUE REGEX</p>}
        </div>
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Confirm New Password:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            className="form-control"
            value={password2}
            onChange={(e) => {
              setPassword2(e.target.value);
              //console.log(e.target.value)
              // console.log(password2)
              // console.log(password3)
              if(password===e.target.value){
                setPasswordErr(true);
                setDisabled(false)
              }
              else{
                setPasswordErr(false);
                setDisabled(true)
              }
            }}
            
            required
          />
        {!Passworderr && <p color="red">PASSWORDS MUST MATCH</p>}
        </div>
        <br />
        <div className="submit-button">
          <button
            disabled={disabled}
            id="mainBtn"
            type="submit"
            className="btn btn-dark"
            onClick={(e) => {
              e.preventDefault();
              // if (!validPassword.test(password2)) {
              //   //setPasswordErr2(true)
              //   //alert("use regex");
              // } else {
              // handleStatus();
              // }
              handleStatus();
            }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
      <br />
      <br />
      <Footer />
    </div>
    
  );
}

export default Register;
