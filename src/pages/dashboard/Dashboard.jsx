import { Input } from "../../components/input/Input";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/Footer/Footer";
import "./Dashboard.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Visualizer from "../visualizer/Visualizer";

function Dashboard() {
  return (
    <div id="dash">
      <Nav />
      <Input />
      <Router>
        <Switch>
          <Route exact path="/visualizer" component={Visualizer} />
        </Switch>
      </Router>
    </div>
  );
}

export default Dashboard;
