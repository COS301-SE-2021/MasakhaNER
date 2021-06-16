import React from 'react'
import "./admin.css"

function Admin() {
    return (
        <>
            <div className = "topBar">
                <h1>MASAKHA NER TOOL</h1>
            </div>
            <div className = "navBar">
                <h3>StopDaCap Team</h3>
                <button className = "btn default">Dashboard</button>
                <button className = "btn default">Admin Users</button>
                <button className = "btn default">Regular Users</button>
                <button className = "btn default">Models</button>
            </div>
        </>
    )
}
export default Admin;