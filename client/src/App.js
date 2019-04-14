import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Form from './components/form/Form'
import {withStyles} from '@material-ui/core/styles'
import appStyle from './appStyle.js'
import RegisterLawyer from './components/pages/RegisterLawyer';
import RegisterReviewer from './components/pages/RegisterReviewer';
import Cases from './components/Cases'
import lawyer from './components/lawyer'
import reviewer from './components/reviewer'

class App extends Component {
  render() {
    const classes = this.props.classes
    return (
      <div className={classes.root}>
        <Router>
          <Switch>
            <Route path="/Form" component={Form} />
            <Route path="/registerLawyer" component={RegisterLawyer} />
            <Route path="/registerReviewer" component={RegisterReviewer} />
            <Route path="/cases" component={Cases} />
            <Route path="/Lawyer" component = {lawyer} />
            <Route path="/reviewer" component = {reviewer} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withStyles(appStyle)(App);
