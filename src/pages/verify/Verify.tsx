import React, {useState, useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./verifyAccount.css"
import { Link } from 'react-router-dom';

function VerifyAccount() {
  const [code, setCode] = useState("");
  const [clicked, setClicked] = useState(false);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "code": code
    }),
  };

  const handleVerify = async () =>{
    const opts ={
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "code": code
      })
    }
    try{
      const resp = await fetch("/Verify", opts);
      console.log(resp);
      if(resp.status === 200){
        const data = await resp.json();
        console.log(data);
        localStorage.setItem("token", data.token);
        window.location.href = "/Dashboard";
        //history.push("/Dashboard");
      }
      else{
        alert("Incorrect login or user does not exists!!!");
        window.location.href = "/";
        //history.push("/");
      }
    }
    catch(error){
      console.log("there is an error", error);
      window.location.href = "/";
      //history.push("/");
    }
  }

//   useEffect(() => {
//       fetch("/verifyAccount", options)
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data.output);
//       })
//       .catch((err) => console.log(err));
    
//   }, [clicked]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

    return (
    <div className="veryify-form">
        <form>
            <h3>Enter Confirmation Code</h3>
            <p>Enter the confirmation code we sent to your email.<em>{localStorage.getItem("newEmail")}</em></p>
            <div className="form-group">
                <input type="text" placeholder="Confirmation Code" className="form-control" id="code" name="code"/>
            </div>
            <br />
            <Link to="/dashboard">
            <button type="submit" className="btn btn-dark" onClick={handleVerify}>Next</button>
            </Link>
        </form>
    </div>
    )
}

export default VerifyAccount
