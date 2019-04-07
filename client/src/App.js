import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Form from './components/Form'
import Companies from './components/Companies';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/Form" component={Form} />
          <Route path="/Companies" component={Companies} />
        </Switch>
      </Router>
    );
  }
}

export default App;
