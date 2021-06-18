import "bootstrap/dist/css/bootstrap.min.css";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import "./Login.css";
import { useState, useEffect } from "react";
import { validEmail, validPassword } from "./Regex";
import { useHistory } from "react-router-dom";
import {FaLinkedin} from "react-icons/fa";
import axios from "axios";


let history;
const responseGoogle = (response: any) => {
  console.log(response);
  history.push("/Dashboard");
};
const responseFacebook = (response: any) => {
  console.log(response);
  history.push("/Dashboard");
};
const responseFailerGoogle = (reoponse: any) =>{
  console.log("failed");
  history.push("/");
}

export default function Login(setToken: any) {
  history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setEmailErr] = useState(false);
  const [passErr, setPasswordErr] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [state, setUser] = useState("");

  const register = () =>{
    history.push("/register");
  }

  // const options = {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({ email: email, password: password }),
  // };

  // useEffect(() => {
  //   if (err) {
  //     fetch("/login", options)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log("data: ", data);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [clicked]);

  const handleLogin = async () =>{
    const opts ={
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      })
    }
    try{
      const resp = await fetch("/login", opts);
      console.log(resp);
      if(resp.status === 200){
        const data = await resp.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        history.push("/Dashboard");
      }
      else{
        alert("Incorrect login or user does not exists!!!");
        history.push("/");
      }
    }
    catch(error){
      console.log("there is an error", error);
      history.push("/");
    }
  }

  return (
    <div className="login-body">
      <div id="login-header">
        <h1>MASAKHA 
          NER TOOL</h1>

      </div>

      <div  className="login">
        <div className="loginTop">
          <h2>LOGIN</h2>
        </div>
        <div className="loginForm">
          <label htmlFor="email">Email address:</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email} onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <br />
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            name="password" 
            value={password} onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <br />

          <div className = "login-button">
            <span>
              <a href="# ">forgot password?</a>
              <button onClick = {handleLogin}  className="btn btn-dark">Login</button>
            </span>
            <span>
              <br/>
                <button className="btn btn-light" onClick = {register}>Sign up</button>
            </span>
          </div>

        </div>
        <p>or log in using</p>
        <div className = "social-btn">
          <GoogleLogin
            clientId="824866690096-4rqi2a1n6bvj9sfstjcbv999i9pi69i3.apps.googleusercontent.com"
            buttonText=""
            onSuccess={responseGoogle}
            onFailure={responseFailerGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <FacebookLogin
            appId="2951110285136034"
            autoLoad={false}
            fields="name,email,picture"
            callback={responseFacebook}
            cssClass = "btn btn-primary"
            textButton = ""
            icon="fab fa-facebook-f"
          />
          <a className="btn btn-primary" href="#!" role="button">
              <FaLinkedin />
          </a>
        </div>
        {err && <p>Invalid email or password</p>}
        
      </div>
    </div>
  );
}
function then() {
  throw new Error("Function not implemented.");
}

