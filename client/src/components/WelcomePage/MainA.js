import React from "react";
import ReactDOM from "react-dom";
import HomepageA from './HomepageA';
import Tab from './Tab';

import "./styles.css";

function MainA() {
  return (
    <div className="MainA">
      {/* <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2> */}
      <Tab /><HomepageA />
    </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<Main />, rootElement);
// ReactDOM.render(<div><Tab /><Homepage /></div>, rootElement);
export default (MainA);