import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Form from './components/form/Form'
import {withStyles} from '@material-ui/core/styles'
import appStyle from './appStyle.js'
import RegisterLawyer from './components/pages/RegisterLawyer';
import RegisterReviewer from './components/pages/RegisterReviewer';
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
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withStyles(appStyle)(App);
