import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Form from './components/Form'
import Reviewer from './components/Reviewer';


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {
            <Route path = "/Reviewer" component = {Reviewer} />
          }
         </Switch>
       </Router>
     
    );
  }
}

export default App;
