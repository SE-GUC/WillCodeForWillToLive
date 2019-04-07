import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import investor from './components/investor'

class App extends Component {
  render() {
    
    return (
      <div>
        <Router>
          <Switch>
            <Route path="/investor" component={investor} />   
          </Switch>
        </Router>
      </div>
    );
  }
}
export default (App);