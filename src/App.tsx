import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./pages/register/Register";
import Verify from "./pages/verify/Verify";
import Admin from "./pages/admin/AdminUser";
import Edit from "./pages/details/editDetails/Edit";
import Changepass from "./pages/details/resetPassword/Changepass";
import About from "./pages/about/About";
import Visualizer from "./pages/visualizer/Visualizer";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/dashboard" component={Dashboard}  />
          <Route exact path="/verify" component={Verify} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/details/edit" component={Edit} />
          <Route exact path="/details/changepassword" component={Changepass} />
          <Route exact path="/about" component={About} />
          <Route exact path="/visualizer" component={Visualizer} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
