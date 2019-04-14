  import React, { Component } from 'react';
  import axios from 'axios';
  import Header from './layout/ReviewerHeader'
  import { Link } from 'react-router-dom';
  import LawyerDistribution from './LawyerDistribution'

  class lawyer extends Component {
      state={
          cases :[],
          username: ""
      }
      
      componentDidMount(){
       axios.get('http://localhost:3002/api/cases').then(res => Object.values(res)[0]).then(element => this.setState({cases :element.data}))
       console.log('State: '+ this.state.cases)
      }
      render() {
        return (
        <div className = "container">
        <div>
         <Header />
           <React.Fragment>
           <LawyerDistribution cases = {this.state.cases}
           payFees = {this.payFees}
           assigncase = {this.assigncase}
           accept = {this.accept}
           reject = {this.reject}
           addreview = {this.addreview}
       />
           </React.Fragment>
        </div>
        </div>
        )
        }

       payFees = (id) => {
          this.setState({
            cases: this.state.cases.map(cas => {
              if(cas._id === id){
                let URL = `http://localhost:3002/api/cases/${id}`
                axios.put(URL,{
                  fees: "0",
                  paid: true
                })
                cas.fees = 0
                cas.paid = true
              }
              return cas
            })
          })
       }
       
       assigncase = (id) =>{
        this.setState({
          cases: this.state.cases.map(cas => {
            if(cas._id === id){
              let URL = `http://localhost:3002/api/cases/${id}`
              axios.put(URL,{
                lawyer: this.state.username
              })
              cas.lawyer = this.state.username
            }
            return cas
          })
        })
      }
      accept = (id) => {
        console.log('Inside super accept ' + id)
        this.setState({cases: this.state.cases.map( cas => {
          console.log('Inside map')
          if(cas._id === id){
            let URL = `http://localhost:3002/api/cases/${id}`
            console.log('URL: ' + URL);
            axios.put(URL, {
              reviewed_by_lawyer: true,
              assignee: "reviewer"
            })
            cas.reviewed_by_lawyer = true
            cas.assignee = "reviewer"
          }
          return cas
        })})
      }
      
      reject = (id) => {
        this.setState({cases: this.state.cases.map(cas => {
          if(cas._id === id){
            let URL = `http://localhost:3002/api/cases/${id}`
            axios.put(URL, {
              reviewed_by_lawyer: false,
              assignee: "investor"
            })
            cas.reviewed_by_lawyer = false
            cas.assignee = "reviewer"
          }
          return cas
        })})
      }
      addreview = (_id, review_comment_by_lawyer) => {
        console.log(review_comment_by_lawyer)
        this.setState({cases: this.state.cases.map( cas => {
            if(cas._id === _id){
              let URL = `http://localhost:3002/api/cases/${_id}`
              axios.put(URL, {
                review_comment_by_lawyer:  review_comment_by_lawyer
              })
              cas.review_comment_by_lawyer =  review_comment_by_lawyer
            }
            return cas
          })})
}
  
  }
  
  export default lawyer;
    