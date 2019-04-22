import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import lawyerCases from './components/lawyerCases'
import reviewerCases from './components/reviewerCases';
import investor from './components/investor'
import Reviewer from './components/reviewer';
import {withStyles} from '@material-ui/core/styles'
import appStyle from './appStyle.js'
import RegisterLawyer from './components/pages/RegisterLawyer';
import RegisterReviewer from './components/pages/RegisterReviewer';
import Companies from './components/Companies';
import Cases from './components/Cases'
import lawyer from './components/lawyer'
import FormTemplate from './components/formTemplate/FormTemplate'
import reviewerassign from './components/reviewerassign'
import investorprofile from './components/profiles/investorprofile'
import lawyerprofile from './components/profiles/lawyerprofile'
import reviewerprofile from './components/profiles/reviewerprofile'
import adminprofile from './components/profiles/adminprofile'
import UnregisteredUser from './components/unregisteredUser'
import RegisterAdmin from './components/pages/RegisterAdmin'
import RegisterInvestor from './components/pages/RegisterInvestor'
import lawyerSearch from './components/lawyerSearch'
import ReviewerSearch from './components/ReviewerSearch'
import EditForm from './components/form/EditForm'
import CreateForm from './components/form/CreateForm'
import DisplayForm from './components/form/DisplayForm'
import loginInvestor from './components/loginInvestor'
import DisplayAllForms from './components/form/DisplayAllForms'

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
            <Route path="/createForm" component={CreateForm} />
            <Route path="/displayForm/:id" component={DisplayForm} />
            <Route path="/editForm/:id" component={EditForm} />
            <Route path="/displayAllForms/:id" component={DisplayAllForms} />
            <Route path="/registerLawyer" component={RegisterLawyer} /> 
            <Route path="/registerReviewer" component={RegisterReviewer} />
            <Route path="/cases" component={Cases} />
            <Route path = "/Reviewer" component = {Reviewer} />
            <Route path = "/reviewerassign" component = {reviewerassign} />
            <Route path="/Lawyer" component = {lawyer} />
            <Route path="/investor" component={investor} />
            <Route path="/loginInvestor" component={loginInvestor} />
            <Route path="/lawyerCases" component={lawyerCases} />
            <Route path="/reviewerCases" component={reviewerCases}/>
            <Route path="/formTemplate" component={FormTemplate} />
            <Route path="/registerAdmin" component = {RegisterAdmin}/>
            <Route path="/signup" component = {RegisterInvestor} />
            <Route path="/LawyerSearch" component = {lawyerSearch} />
            <Route path="/ReviewerSearch" component={ReviewerSearch} />
          </Switch>
        </Router>
      </div>

    );
  }
}


export default withStyles(appStyle)(App);
