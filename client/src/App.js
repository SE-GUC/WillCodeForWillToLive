import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import RegisterLawyer from './components/pages/RegisterLawyer';
import RegisterReviewer from './components/pages/RegisterReviewer';
import Form from './components/Form'
import Cases from './components/Cases'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>

          {
                <Route path="/Form" component={Form} />
          }
       {
                <Route path="/registerLawyer" component={RegisterLawyer} />
          }
       {
                <Route path="/registerReviewer" component={RegisterReviewer} />
          }
          {
            <Route path="/cases" component={Cases} />
          }
       

        </Switch>
      </Router>
    );
  }
}

export default App;
