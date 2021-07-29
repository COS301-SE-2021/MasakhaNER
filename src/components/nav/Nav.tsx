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
            <h1 className="navbar-heading">Masakha NER Tool</h1>
            <p className="navbar-subheading">Web-based interface used as a named entity recognition tool for African languages.</p>
            <button onClick = {handleLogout} className="btn btn-dark">Log out</button>
        </div>
    )
}

export default Nav
