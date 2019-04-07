import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import RegisterLawyer from './components/pages/RegisterLawyer';
import RegisterReviewer from './components/pages/RegisterReviewer';
import Form from './components/Form'
import lawyer from './components/lawyer'
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
            <Route path="/Lawyer" component = {lawyer} />
          }


        </Switch>
      </Router>
    );
  }
}

export default App;
