import React from "react";
import ReactDOM from "react-dom";
import Homepage from './Homepage';
import Tab from './Tab';

import "./styles.css";

function Main() {
  return (
    <div className="Main">
      {/* <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2> */}
      <Tab /><Homepage />
    </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Main />, rootElement);
// ReactDOM.render(<div><Tab /><Homepage /></div>, rootElement);
export default (Main);