import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css"
import { Link } from 'react-router-dom';

function Nav() {
    return (
        <div className="Navbar">
            <h1 id="navbar-heading">Masakha NER Tool</h1>
            <p id="navbar-subheading">Web-based interface used as a named entity recognition tool for African languages.</p>
            <Link to="/"><button className="btn btn-dark">Log out</button></Link>
        </div>
    )
}

export default Nav
