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
        <button onClick={dash} className="btn btn-dark">
          Dashboard
        </button>
        <button onClick={edit} className="btn btn-dark">
          Edit Details
        </button>
        <button onClick={about} className="btn btn-dark">
          About
        </button>
      </div>
      <div>
        <h1 id="navbar-heading">Masakha NER Tool</h1>
        <p id="navbar-subheading">
          Web-based interface used as a named entity recognition tool for
          African languages.
        </p>
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
