import "bootstrap/dist/css/bootstrap.min.css";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import "./Login.css";
import React, { useState } from "react";
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
  const [err, setEmailErr] = useState(false);

  const validate = () => {
    console.log(email);
    if (!validEmail.test(email)) {
      setEmailErr(true);
    } else {
      history.push("/Dashboard");
    }
  };
  
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
        <button className="btn btn-success" onClick={validate}>
          Login
        </button>
        <br />
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
      {err && <p>Envalid email</p>}
      <div className="forgot">
        <a href="# ">forgot password?</a>
      </div>
    </div>
  );
}
