import React, { useState, useEffect } from "react";
import "./App.css";
import Dashboard from "./pages/dashboard/Dashboard";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from "./components/login/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/dashboard' component = {Dashboard} />
        </Switch>
      </Router>
      
    </div>
  );
}

export default App;
