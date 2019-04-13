import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import investor from './components/investor'
import Reviewer from './components/Reviewer';
import Form from './components/form/Form'
import {withStyles} from '@material-ui/core/styles'
import appStyle from './appStyle.js'
import RegisterLawyer from './components/pages/RegisterLawyer';
import RegisterReviewer from './components/pages/RegisterReviewer';
import Companies from './components/Companies';
import Cases from './components/Cases'
import lawyer from './components/lawyer'
import reviewerassign from './components/reviewerassign'
import investorprofile from './components/profiles/investorprofile'
import lawyerprofile from './components/profiles/lawyerprofile'
import reviewerprofile from './components/profiles/reviewerprofile'
import adminprofile from './components/profiles/adminprofile'
import UnregisteredUser from './components/unregisteredUser'

class App extends Component {
  render() {
    const classes = this.props.classes
    return (
      <div className={classes.root}>
        <Router>
          <Switch>
          <Route path="/investorprofile" component={investorprofile} />
          <Route path="/lawyerprofile" component={lawyerprofile} />
          <Route path="/reviewerprofile" component={reviewerprofile} />
          <Route path="/adminprofile" component={adminprofile} />
          <Route path="/unregisteredUser" component={UnregisteredUser} />







            <Route path="/Companies" component={Companies} />
            <Route path="/Form" component={Form} />
            <Route path="/registerLawyer" component={RegisterLawyer} /> -->
            <Route path="/registerReviewer" component={RegisterReviewer} />
            <Route path="/cases" component={Cases} />
            <Route path = "/Reviewer" component = {Reviewer} />
            <Route path = "/reviewerassign" component = {reviewerassign} />
            <Route path="/Lawyer" component = {lawyer} />
            <Route path="/investor" component={investor} /> 

          </Switch>
        </Router>
      </div>
    );
  }
}


export default withStyles(appStyle)(App);
