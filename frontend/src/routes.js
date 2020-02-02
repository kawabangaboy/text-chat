import React from "react";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Auth from "./routes/Auth";
import Chat from "./routes/Chat";
import RoomsSelect from "./routes/RoomSelect";
const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Auth} />
        <Route path="/rooms" component={RoomsSelect} />
        <Route path="/chats" component={Chat} />
      </Switch>
    </Router>
  );
};

export default Routes;
