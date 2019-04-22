import React from "react";
import ReactDOM from "react-dom";
import Homepage from './Homepage';
import Tab from './Tab';

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
ReactDOM.render(<div><Tab /><Homepage /></div>, rootElement);
