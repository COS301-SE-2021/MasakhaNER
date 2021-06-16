
import { useHistory } from 'react-router-dom';
import { Input } from '../input/Input';
import "./admin.css"

let history;

function Admin() {
    history = useHistory();
    const displayDashboard = () => {
        history.push("/Dashboard");
    };

    const getAdminUsers = () =>{

    };
    
    const getRegularUsers = () =>{

    };

    const Models = () =>{

    };

    return (
        <>
            <div className = "topBar">
                <h1>MASAKHA NER TOOL</h1>
            </div>
            <div className = "navBar">
                <h3>StopDaCap Team</h3>
                <button className = "btn default" onClick = {displayDashboard}>Dashboard</button>
                <button className = "btn default" onClick = {getAdminUsers}>Admin Users</button>
                <button className = "btn default" onClick = {getRegularUsers}>Regular Users</button>
                <button className = "btn default" onClick = {Models}>Models</button>
            </div>
            <div id = "output"></div>
        </>
    )
}
export default Admin;