import "bootstrap/dist/css/bootstrap.min.css";
import { FaLock } from "react-icons/fa";
import { FaMailBulk } from "react-icons/fa";
import './Login.css'

export default function Login() {
    return (
        <div className = 'login'>
            <div className = 'loginTop'>
                <h2>Log In</h2>
            </div>
            <form className = 'loginForm'action="">
                <div>
                    <label htmlFor="email">Email:  </label>
                    <input type="text" id = 'email' placeholder = "Email" required /><br/>
                </div><br/>
                <div>
                    <label htmlFor="pass">Password:  </label>
                    <input type="password" id = 'pass' placeholder = 'Password' required/><br/>
                </div><br/>
                <input type = 'submit' className = 'btn btn-success' value = 'Login' /><br/>
                <a href="#" className = 'btn btn-primary'>Signup</a>
            </form> 
            <div className = 'forgot'>
                <a href="# ">forgot password?</a>
            </div>
        </div>
    )
}
