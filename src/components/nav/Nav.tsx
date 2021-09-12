import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css";
import { useHistory } from "react-router-dom";
let history;

function Nav() {
  history = useHistory();
  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/");
  };
  const dash = () => {
    history.push("/dashboard");
  };
  const edit = () => {
    history.push("/details/edit");
  };
  const about = () => {
    history.push("/about");
  };
  return (
    <div className="Navbar">
      <div className="menu">
        <div id="logo">
          <h2>masakhaner</h2>
        </div>
        {/* <a onClick={dash} className="btn btn-dark">
          Dashboard
        </a>
        <button onClick={edit} className="btn btn-dark">
          Edit Details
        </button>
        <button onClick={about} className="btn btn-dark">
          About
        </button> */}
      </div>

      <div>
        <button onClick={handleLogout} className="btn btn-dark">
          Log out
        </button>
      </div>
    </div>
  );
}

export default Nav;
