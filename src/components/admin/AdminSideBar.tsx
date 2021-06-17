
import { useHistory } from 'react-router-dom';
import "./admin.css"

let history;

function AdminSideBar() {
    history = useHistory();
    const displayDashboard = () => {
        history.push("/Dashboard");
    };

    const getAdminUsers = () =>{
        history.push("/AdminUsers");
    };
    
    const getRegularUsers = () =>{
        history.push("/RegisterUsers");
    };

    const Models = () =>{
        history.push("/Models");
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
export default AdminSideBar;