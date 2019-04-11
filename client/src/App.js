import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import lawyerCases from './components/lawyerCases'
import reviewerCases from './components/reviewerCases';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
            <Route path="/lawyerCases" component={lawyerCases} /> 
            <Route path="/reviewerCases" component={reviewerCases}/>
       </Switch>
      </Router>
    );
  }
}

export default App;
