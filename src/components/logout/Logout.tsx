import React from 'react'
import { useHistory } from 'react-router-dom';
let history;

export default function Logout() {
    history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem("token");
        history.push("/");
    };
    return (
        <div>
        <button onClick={handleLogout}>Log out</button>
            
        </div>
    )
}
