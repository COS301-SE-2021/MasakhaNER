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
            <p>Enter the confirmation code we sent to your email.</p>
            <div className="form-group">
                <input type="text" placeholder="Confirmation Code" className="form-control" id="code" name="code"/>
            </div>
            <br />
            <Link to="/dashboard">
            <button type="submit" className="btn btn-dark">Next</button>
            </Link>
        </form>
    </div>
    )
}

export default VerifyAccount
