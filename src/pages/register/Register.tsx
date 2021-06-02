import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import './Register.css';
import ReCAPTCHA from "react-google-recaptcha";


function Register() {
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [clicked, setClicked] = useState(false);

    const options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({"firstName":firstName, "lastName":lastName, "email":email, "password":password})
    };

    useEffect(() => {
        fetch("/register", options)
        .then((res) => res.json())
        .then((data) => {
            data.output[0] !== undefined && console.log(data.output[0])
        })
        .catch((err) => console.log(err));
    }, [clicked]);

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    return (
        <div className="signup-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input type="text" 
                    name="firstName" 
                    id="firstName" 
                    className="form-control" 
                    placeholder="Enter your first name..."
                    value={firstName}
                    onChange={e => setfirstName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input type="text" 
                    name="flastName" 
                    id="lastName" 
                    className="form-control" 
                    placeholder="Enter your last name..."
                    value={lastName}
                    onChange={e => setlastName(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" 
                    name="emal" 
                    id="email" 
                    className="form-control" 
                    placeholder="Enter your email..."
                    value={email}
                    onChange={e => setemail(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" 
                    name="password" 
                    id="password" 
                    className="form-control" 
                    placeholder="Enter your password..."
                    value={password}
                    onChange={e => setPassword(e.target.value)}/>
                </div>
                <br />
                <button type="submit" 
                className="btn btn-secondary" onClick={()=>setClicked(!clicked)}>Submit</button>
            </form>
            <ReCAPTCHA
            sitekey="6LewewkbAAAAABw16AsxyxxNkLRnaBi0RWukXzVj"
            /*Server Side: 6LeJWgkbAAAAAEhHofPc5SfmLrRSALFkH5976L6T */
            />
       </div>
    )
}

export default Register
