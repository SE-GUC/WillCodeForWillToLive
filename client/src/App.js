import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Reviewer from './components/Reviewer';


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
    return (
      <Router>
        <Switch>
          {
            <Route path = "/Reviewer" component = {Reviewer} />
          }
         </Switch>
       </Router>
     
    );
  }
}

export default App;