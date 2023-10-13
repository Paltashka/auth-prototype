// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import PrivatePage from "./components/PrivatePage";

const App = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/private">
            <PrivatePage />
          </Route>
          <Route path="/">
            <LoginForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
