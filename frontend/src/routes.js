import React from "react";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Auth from "./routes/Auth";
import Chat from "./routes/Chat";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/chat" component={Chat} />
      </Switch>
    </Router>
  );
};

export default Routes;
