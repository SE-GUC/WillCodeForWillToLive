import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Form from './components/Form'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/Form" component={Form} />
        </Switch>
      </Router>
    );
  }
}

export default App;
