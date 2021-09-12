import "bootstrap/dist/css/bootstrap.min.css";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import "./Login.css";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImageWrapper = styled.div`
  height: 100vh;
  width: 45vw;
  background-image: url("../../images/login-image.png");
  background-repeat: no-repeat;
  background-color: #305c16;
`;

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 55vw;
  border: solid 1px #ffffff;
  margin: 0 auto;
  align-self: flex-end;

  #google-button {
    transform: translateY(-7px);
  }
`;

const Input = styled.input`
  border: solid 1px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  height: 35px;
  width: 20em;
  padding: 15px;

  &:hover {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
    transition: 0.4s;
  }

  &:focus {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1);
  }
`;

const Button = styled.button`
  border: solid 1px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
  width: 10em;
  background-color: white;
  border-radius: 5px;
  height: 35px;
  width: 20em;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.1);
  &:hover {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
    transition: 0.4s;
    border-radius: 5px;
  }
`;

const SignUpButton = styled(Button)`
  background-color: #1c5f22;
  border: solid 1px #1c5f22;
  color: white;
  &:hover {
    border: solid 1px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
    transition: 0.4s;
    border-radius: 5px;
    background-color: #34833b;
    border: solid 1px #34833b;
  }
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
    <Container>
      <ImageWrapper id="image"></ImageWrapper>
      <Wrapper>
        <div style={{ transform: "translateX(-40px)" }}>
          <h2 style={{ fontSize: "50px", color: "#1c5f22" }}>Get started</h2>
          <h2
            style={{
              fontSize: "30px",
              transform: "translateX(-78px)",
              opacity: "0.6",
            }}
          >
            Log in
          </h2>
        </div>
        <Input
          style={{ marginTop: "15px" }}
          type="email"
          name="email"
          value={email}
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button onClick={handleLogin}>Login</Button>
        <p onClick={changePassword} style={{ fontSize: "14px" }}>
          forgot password?
          <a style={{ color: "#1c5f22", fontSize: "14px" }}> click here</a>
        </p>
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
        {/* <FacebookLogin
          appId="2951110285136034"
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          cssClass="btn btn-primary"
          icon="fab fa-facebook-f"
          textButton="   Log in with Facebook"
        /> */}
        {err && <p>Invalid email or password</p>}
      </Wrapper>
    </Container>
  );
}
