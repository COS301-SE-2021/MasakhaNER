import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";

function VerifyAccount() {
    return (
    <div className="signup-form">
        <form>
            <h3>Enter Confirmation Code</h3>
            <p>Enter the confirmation code we sent to your email.</p>
            <div className="form-group">
                <input type="text" placeholder="Confirmation Code" className="form-control"/>
            </div>
            <button type="submit" className="btn btn-primary">Next</button>
        </form>
    </div>
    )
}

export default VerifyAccount
