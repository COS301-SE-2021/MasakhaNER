import "bootstrap/dist/css/bootstrap.min.css";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import "./Login.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  width: 80vw;
  border: solid 1px #ffffff;
  margin: 0 auto;
  margin-top: 8vh;
  border-radius: 20px;
  box-shadow: 2px 2px 20px 0px rgba(0, 0, 0, 0.2);

  #google-button {
    transform: translateY(-7px);
  }
`;

const Bar = styled.div`
  width: inherit;
  height: 5px;
  background-color: #000;
  margin-top: 5px;
`;

const Header = styled.h1`
  font-size: 3em;
  @media (max-width: 767px) {
    font-size: 2em;
  }
`;

const Input = styled.input`
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  height: 35px;
  width: 15em;
  padding: 15px;

  &:hover {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
    transition: 0.4s;
  }

  &:focus {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1);
  }
`;

const Button = styled.button`
  border: solid 1px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  width: 10em;
  background-color: white;
  border-radius: 20px;
  height: 35px;
  width: 15em;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1);
  &:hover {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
    transition: 0.4s;
  }
`;

const SignUpButton = styled(Button)`
  background-color: #4591e7;
  border: solid 1px #4591e7;
  color: white;
`;

let history;

const responseGoogle = (response: any) => {
  console.log(response);
  history.push("/Dashboard");
};

const responseFacebook = (response: any) => {
  console.log(response);
  history.push("/Dashboard");
};

const responseFailerGoogle = (reoponse: any) => {
  console.log("failed");
  history.push("/");
};

export default function Login() {
  history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setEmailErr] = useState(false);

  const register = () => {
    history.push("/register");
  };

  const changePassword = () => {
    history.push("/details/changepassword");
  };

  const handleLogin = async () => {
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    try {
      const resp = await fetch("/login", opts);
      console.log(resp);
      if (resp.status === 200) {
        const data = await resp.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("isAuthenticated", "true");
        if (data.isadmin) {
          history.push("/Admin");
        } else {
          history.push("/Dashboard");
        }
      } else {
        alert("Incorrect login or user does not exists!!!");
        history.push("/");
      }
    } catch (error) {
      console.log("there is an error", error);
      history.push("/");
    }
  };

  return (
    <Wrapper>
      <Header>
        MasakhaNER
        <Bar />
      </Header>
      <div>
        <h2>LOG IN</h2>
      </div>

      <label>Email address</label>
      <Input
        type="email"
        name="email"
        value={email}
        placeholder="Enter your email address"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Password</label>
      <Input
        type="password"
        name="password"
        value={password}
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button onClick={handleLogin}>Login</Button>
      <p onClick={changePassword}>forgot password?</p>
      <SignUpButton onClick={register}>Sign up</SignUpButton>
      <p>or log in using</p>
      <div id="google-button">
        <GoogleLogin
          clientId="824866690096-4rqi2a1n6bvj9sfstjcbv999i9pi69i3.apps.googleusercontent.com"
          buttonText="Log in with Google"
          onSuccess={responseGoogle}
          onFailure={responseFailerGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
      <FacebookLogin
        appId="2951110285136034"
        autoLoad={false}
        fields="name,email,picture"
        callback={responseFacebook}
        cssClass="btn btn-primary"
        icon="fab fa-facebook-f"
        textButton="   Log in with Facebook"
      />
      {err && <p>Invalid email or password</p>}
    </Wrapper>
  );
}
