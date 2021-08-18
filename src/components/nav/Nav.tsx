import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css"
import { useHistory } from 'react-router-dom';
let history;

function Nav() {
    history = useHistory();
    const handleLogout = () =>{
        localStorage.removeItem('token');
        history.push('/');
    }
    return (
        <div className="Navbar">
            <button className="btn btn-dark">Dashboard</button>
            <button className="btn btn-dark">Edit Details</button>
            <button className="btn btn-dark">About</button>
            <h1 id="navbar-heading">Masakha NER Tool</h1>
            <p id="navbar-subheading">Web-based interface used as a named entity recognition tool for African languages.</p>
            <button onClick = {handleLogout} className="btn btn-dark">Log out</button>
        </div>
    )
}

export default Nav
