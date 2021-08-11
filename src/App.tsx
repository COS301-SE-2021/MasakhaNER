import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/login/Login";
import Register from "./pages/register/Register";
import Verify from "./pages/verify/Verify";
import Admin from "./pages/admin/AdminUser";
import Edit from "./pages/details/editDetails/Edit";
import Changepass from "./pages/details/resetPassword/Changepass";

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
          <Route exact path="/changepassword" component={Changepass} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
