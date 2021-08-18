import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Edit.css";
import ReCAPTCHA from "react-google-recaptcha";
import Nav from "../../../components/nav/Nav";
import Footer from "../../../components/Footer/Footer";

function Register() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [clicked, setClicked] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [Emailerr, setEmailErr] = useState(false);
  const [Passworderr, setPasswordErr] = useState(false);

  const options: any = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-access=token":localStorage.getItem("token")
    },
    body: JSON.stringify({
      firstname: firstName,
      lastname: lastName
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
          <h2>Edit Details</h2>
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
        <br />
        <div className="submit-button">
          <button
            // disabled={disabled}
            id="mainBtn"
            type="submit"
            className="btn btn-dark"
            onClick={(e) => {
              e.preventDefault();
              handleStatus();
            }}
          >
            Submit
          </button>
        </div>
        {Passworderr ||
          (Emailerr && <p color="red">INVALID EMAIL OR PASSWORD</p>)}
      </form>
    </div>
      <br />
      <br />
      <Footer />
    </div>
    
  );
}

export default Register;
