import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ReviewerItem from './ReviewerItem'
import PropTypes from 'prop-types'
import nfetch from 'node-fetch'
import Header from './layout/ReviewerHeader'
import writeReview from './WriteReview'
import axios from 'axios'
import ReviewerDistribution from './ReviewerDistribution'

//import styles from '../style.css'

// const mongoose = require('mongoose')
// const db = process.env.mongoURI
// mongoose.connect(db, {useNewUrlParser: true}).then(() => console.log('Connected to Database')).catch(err => console.log(err))

//const Case = require('../../../models/Case')



class Reviewer extends Component {

  state = {
    cases: []
  }

  componentDidMount(){
    axios.get('http://localhost:3002/api/cases')
    .then(res => Object.values(res)[0])
    .then(element => this.setState({cases:element.data}))
    .catch(err => console.log(err))
  }

  render() {
      return (
        <div>
          <div className = "container">
            <Header />
              <React.Fragment>
                <ReviewerDistribution cases = {this.state.cases}
                accept = {this.accept}
                reject = {this.reject} />
              </React.Fragment>
          </div>
        </div>

        // this.state.cases.map((cas) => (
        //   <ReviewerItem 
        //   key = {cas._id} 
        //   cas = {cas} 
        //   accept = {this.accept}
        //   reject = {this.reject} /> 
        // )

          // <ReviewerItem //key = {cas._id} 
          // cas = {cas} 
          // accept = {this.accept}
          // reject = {this.reject} /> 
        )

        //<Header />
        //)
    // <div>
    //   <div className = "container">
    //  <Header />
    //    <Route path = "/writeReview" component = {writeReview} />
    //   </div>
    // </div>

      /*this.props.reviewers.map((reviewer) => (
        <ReviewerItem 
        key = {reviewer.id} 
        reviewer = {reviewer} 
        markComplete = {this.props.markComplete} 
        accept = {this.props.accept}
        reject = {this.props.reject} /> 
      )*/

  }

  accept = (id) => {
    console.log('Inside super accept ' + id)
    this.setState({cases: this.state.cases.map( cas => {
      console.log('Inside map')
      if(cas._id === id){
        let URL = `http://localhost:3002/api/cases/${id}`
        console.log('URL: ' + URL);
        axios.put(URL, {
          reviewed_by_reviewer: true
        })
        cas.reviewed_by_reviewer = true
      }
      return cas
    })})
  }
  
  reject = (id) => {
    this.setState({cases: this.state.cases.map(cas => {
      if(cas._id === id){
        let URL = `http://localhost:3002/api/cases/${id}`
        axios.put(URL, {
          reviewed_by_reviewer: false
        })
        cas.reviewed_by_reviewer = false
      }
      return cas
    })})
  }

}


  

// Reviewer.propTypes = {
//   cases: PropTypes.array.isRequired
// }


export default Reviewer;