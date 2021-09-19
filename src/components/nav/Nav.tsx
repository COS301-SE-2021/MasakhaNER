import "bootstrap/dist/css/bootstrap.min.css";
import "./Nav.css";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
let history;

const ButtonContainer = styled.div`
  color: #1c5f22;
  transform: translateY(6px);
  a {
    margin-right: 25px;
  }
`;

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
          <h2 onClick={dash}>masakhaner</h2>
        </div>
      </div>

      <ButtonContainer>
        <a onClick={about}>About</a>
        <a onClick={edit}>Edit Details</a>
        <a onClick={handleLogout}>Log out</a>
      </ButtonContainer>
    </div>
  );
}

export default Nav;
