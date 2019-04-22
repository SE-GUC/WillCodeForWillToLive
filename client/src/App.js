import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import lawyerCases from './components/lawyerCases'
import reviewerCases from './components/reviewerCases';
import investor from './components/investor'
import Reviewer from './components/reviewer';
import ReviewerA from './components/reviewerA';
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
import UnregisteredUserA from './components/unregisteredUserA'
import RegisterAdmin from './components/pages/RegisterAdmin'
import RegisterInvestor from './components/pages/RegisterInvestor'
import lawyerSearch from './components/lawyerSearch'
import lawyerSearchA from './components/lawyerSearchA'
import ReviewerSearch from './components/ReviewerSearch'
import ReviewerSearchA from './components/ReviewerSearchA'
import loginInvestor from './components/loginInvestor'
import EditForm from './components/form/EditForm'
import CreateForm from './components/form/CreateForm'
import DisplayForm from './components/form/DisplayForm'
import LawyerA from './components/lawyerA'
import InvestorA from './components/investorA'
import RegisterReviewerA from './components/pages/RegisterReviewerA'
import RegisterLawyerA from './components/pages/RegisterLawyerA'
import RegisterAdminA from './components/pages/RegisterAdminA'
import RegisterInvestorA from './components/pages/RegisterInvestorA'
import LoginEmployee from './components/pages/LoginEmployee';
import DisplayAllForms from './components/form/DisplayAllForms'
import loginInvestor from './components/loginInvestor'

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
          <Route path="/unregisteredUserA" component={UnregisteredUserA} />
          <Route path="/Companies" component={Companies} />
          <Route path="/Form" component={Form} />
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
          <Route path="/LawyerSearchA" component = {lawyerSearchA} />
          <Route path="/ReviewerSearch" component={ReviewerSearch} />
          <Route path="/ReviewerSearchA" component={ReviewerSearchA} />
    			<Route path="/DisplayForm/:id" component={DisplayForm} />
            <Route path="/Companies" component={Companies} />
            <Route path="/createForm" component={CreateForm} />
            <Route path="/displayForm/:id" component={DisplayForm} />
            <Route path="/editForm/:id" component={EditForm} />
            <Route path="/displayAllForms/:id" component={DisplayAllForms} />
            <Route path="/registerLawyer" component={RegisterLawyer} />
            <Route path="/registerReviewer" component={RegisterReviewer} />
            <Route path="/cases" component={Cases} />
            <Route path = "/Reviewer" component = {Reviewer} />
            <Route path = "/ReviewerA" component = {ReviewerA} />
            <Route path = "/reviewerassign" component = {reviewerassign} />
            <Route path="/Lawyer" component = {lawyer} />
            <Route path="/investor" component={investor} />
            <Route path="/lawyerCases" component={lawyerCases} />
            <Route path="/reviewerCases" component={reviewerCases}/>
            <Route path="/formTemplate" component={FormTemplate} />
            <Route path="/registerAdmin" component = {RegisterAdmin}/>
            <Route path="/signup" component = {RegisterInvestor} />
            <Route path="/LawyerSearch" component = {lawyerSearch} />
            <Route path="/ReviewerSearch" component={ReviewerSearch} />
			      <Route path="/DisplayForm/:id" component={DisplayForm} />
            <Route path="/LawyerA" component={LawyerA} />
            <Route path = "/InvestorA" component = {InvestorA} />
            <Route path = "/RegisterReviewerA" component = {RegisterReviewerA} />
            <Route path = "/RegisterLawyerA" component = {RegisterLawyerA} />
            <Route path = "/RegisterAdminA" component = {RegisterAdminA} />
            <Route path = "/signupA" component = {RegisterInvestorA} />
      <Route path="/loginEmployee" component={LoginEmployee}/>
          </Switch>
        </Router>
      </div>

    );
  }
}


export default withStyles(appStyle)(App);
