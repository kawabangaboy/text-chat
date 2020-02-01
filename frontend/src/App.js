import React from "react";
import "./App.css";

import Board from "./Board";
import Store from "./store";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Auth from "./Auth";

function App() {
  return (
    <Store>
      <Router>
        <Switch>
          <Route path="/" exact component={Auth} />
          <Route path='/chats' component={Board} />
        </Switch>
      </Router>
    </Store>
  );
}

export default App;
