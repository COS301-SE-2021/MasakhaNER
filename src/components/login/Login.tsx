import "bootstrap/dist/css/bootstrap.min.css";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import "./Login.css";
import React, { useState, useEffect } from "react";
import { validEmail, validPassword } from "./Regex";
import { Link, useHistory } from "react-router-dom";

let history;
const responseGoogle = (response: any) => {
  console.log(response);
  history.push("/Dashboard");
};
const responseFacebook = (response: any) => {
  console.log(response);
  history.push("/Dashboard");
};

export default function Login(this: any) {
  history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setEmailErr] = useState(false);
  const [clicked, setClicked] = useState(false);

  const validate = () => {
    console.log(email);
    if (!validEmail.test(email)) {
      setEmailErr(true);
    } else {
      setClicked(!clicked);
      history.push("/Dashboard");
    }
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  };

  useEffect(() => {
    if (err) {
      fetch("/login", options)
        .then((res) => res.json())
        .then((data) => {
          console.log("data: ", data);
        })
        .catch((err) => console.log(err));
    }
  }, [clicked]);

  return (
    <div className="login">
      <div className="loginTop">
        <h2>Log In</h2>
      </div>
      <div className="loginForm">
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input type="password" placeholder="Password" required />
        <br />
        <button className="btn btn-dark" onClick={validate}>
          Login
        </button>
        <br />
        <p>Don't have an account? Sign up</p>
        <Link to="/register">
          <a href="#" className="btn btn-primary">
            Signup
          </a>
        </Link>
      </div>
      <GoogleLogin
        clientId="824866690096-4rqi2a1n6bvj9sfstjcbv999i9pi69i3.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      <FacebookLogin
        appId="2951110285136034"
        autoLoad={true}
        fields="name,email,picture"
        callback={responseFacebook}
        icon="fa-facebook"
      />
      {err && <p>Invalid email or password</p>}
      <div className="forgot">
        <a href="# ">forgot password?</a>
      </div>
    </div>
  );
}
