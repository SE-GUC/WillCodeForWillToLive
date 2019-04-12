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
import AllForms from './components/form/AllForms'
class App extends Component {
/* state = {
   reviewers: [
     {
       id: 1,
       title: 'Review Task 1',
       completed: false
     },
    {
      id: 2,
      title: 'Review Task 2',
      completed: true
    },
    {
      id: 3,
      title: 'Review Task 3',
      completed: false
    }
   ]
 }
 
markComplete = (id) => {
  this.setState({reviewers: this.state.reviewers.map(reviewer => {
    if(reviewer.id === id){
      reviewer.completed = !reviewer.completed
    }
    return reviewer
  })})
}

accept = (id) => {
  this.setState({reviewers: this.state.reviewers.map(reviewer => {
    if(reviewer.id === id){
      reviewer.completed = true
    }
    return reviewer
  })})
}

reject = (id) => {
  this.setState({reviewers: this.state.reviewers.map(reviewer => {
    if(reviewer.id === id){
      reviewer.completed = false
    }
    return reviewer
  })})
}
*/
  render() {
    const classes = this.props.classes
    return (
      <div className={classes.root}>
        <Router>
          <Switch>
            <Route path="/Companies" component={Companies} />
            <Route path="/Form" component={Form} />
            <Route path="/registerLawyer" component={RegisterLawyer} />
            <Route path="/registerReviewer" component={RegisterReviewer} />
            <Route path="/cases" component={Cases} />
            <Route path = "/Reviewer" component = {Reviewer} />
            <Route path="/Lawyer" component = {lawyer} />
            <Route path="/investor" component={investor} /> 
            <Route path="/allForms" component={AllForms} /> 
          </Switch>
        </Router>
      </div>
    );
  }
}


export default withStyles(appStyle)(App);
