import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

function verifyAccount() {
    return (
        <div>
            <h3>Enter Confirmation Code</h3>
            <p>Enter the confirmation code we sent to your email.</p>
            <input type="text" placeholder="Confirmation Code" className="form-control"/>
            <button type="submit" className="btn btn-primary">Next</button>
        </div>
    )
}

export default verifyAccount
