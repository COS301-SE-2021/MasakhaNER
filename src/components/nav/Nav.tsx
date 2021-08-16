import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css"
import { useHistory } from 'react-router-dom';
import { MenuItem } from '@material-ui/core';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
let history;


function Nav() {
    history = useHistory();
    const handleLogout = () =>{
        localStorage.removeItem('token');
        history.push('/');
    }
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const goToDash = () =>{
        history.push();
    };
    const goToDetails = () =>{
        history.push("/details/edit");
    };
    const goToAbout = () =>{
        history.push("/about");
    };

    return (
        <div className="Navbar">
            <PopupState  variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                    <React.Fragment>
                    <Button variant="contained" color="default" {...bindTrigger(popupState)}>
                        Menu
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={goToDash}>Dashboard</MenuItem>
                        <MenuItem onClick={goToDetails}>Details</MenuItem>
                        <MenuItem onClick={goToAbout}>About</MenuItem>
                    </Menu>
                    </React.Fragment>
                )}
            </PopupState>
            <h1 id="navbar-heading">Masakha NER Tool</h1>
            <p id="navbar-subheading">Web-based interface used as a named entity recognition tool for African languages.</p>
            <button onClick = {handleLogout} className="btn btn-dark">Log out</button>
        </div>
    )
}

export default Nav
