import React from "react";
import "./App.css";

import Board from "./Board";
import Store from "./store";
function App() {
  return (
    <Store>
      <Board />
    </Store>
  );
}

export default App;
