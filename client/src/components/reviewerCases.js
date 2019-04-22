import React, { Component } from 'react';
  import axios from 'axios';
  import jwt from 'jsonwebtoken';
  import tokenkey from '../config/keys'


  
  class reviewerCases extends Component {
      state={
          reviewerCases:[],
          username: ''
      }

      handleClick1 = () => {
       
         
        this.state.reviewerCases.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0)); 

         this.setState({ reviewerCases: this.state.reviewerCases })
       
      }
      handleClick2 = () => {

        this.state.reviewerCases.sort((a,b) => (a.created_at > b.created_at) ? 1 : ((b.created_at > a.created_at) ? -1 : 0)); 

        this.setState({ reviewerCases: this.state.reviewerCases })
       
       
    }


      componentDidMount(){
        jwt.verify(localStorage.getItem('token'),tokenkey.secretkey,(err,payload) =>{
          if(err){
         console.log(err);
        }else{
          const usernamepay = payload.username
          axios.get('http://localhost:3002/api/reviewer/getCases/'+usernamepay,{headers:{'Authorization' : `Bearer ${localStorage.getItem('token')}`}}).then(res => Object.values(res)[0]).then(element => {
          if(element.msg===undefined){  
          this.setState({reviewerCases:element.data})}
        else{
          alert(element.msg)
        }
        }
        )
        }
      }
        )
       
       
      }

    render() {
      return(
        <div className="reviewerCases">
        <h1> reviewer Cases Status</h1>
        <br/>
        <table>
          <thead>
            <tr>
  
            </tr>
          </thead>
          <tbody>
       
            {this.state.reviewerCases.map((reviewerCases)=> {
              return(
                
                <tr>
                <td>{<h5><div>CaseID: {reviewerCases._id}</div>
                <div> Case Status: {reviewerCases.status}</div>
                <div> Investor: {reviewerCases.investor}</div>
                <div> Reviewer:  {reviewerCases.reviewer}</div>
                <div> Lawyer: {reviewerCases.lawyer}</div>
                <div>Company Name: {reviewerCases.company_name}</div>
                <div> reviewed by lawyer:  {reviewerCases.reviewed_by_lawyer}</div>
                <div> Lawyer Comment: {reviewerCases.review_comment_by_lawyer}</div>
                <div> lawyer comment date: {reviewerCases.review_date_by_lawyer}</div>
                <div> reviewed by reviewer: {reviewerCases.reviewed_by_reviewer}</div>
                <div> reviewer comment:  {reviewerCases.review_comment_by_reviewer}</div>
                <div>reviewer comment date:  {reviewerCases.review_date_by_reviewer}</div>
                <div> fees: {reviewerCases.fees}</div><div> paid:  {reviewerCases.paid}</div>
                <div> currency: {reviewerCases.currency}</div>
                <div>formID: {reviewerCases.formID}</div>
                <div> priority:  {reviewerCases.priority}</div>
                <div> description: {reviewerCases.description}</div>
                <div> created_at: {reviewerCases.created_at}</div>
                <div> isDone: {reviewerCases.isDone}</div>
                <div> dueDate:  {reviewerCases.dueDate}</div></h5>}</td>
               
                </tr>
                 
              )
             
            })
          }
           </tbody>
              <button onClick={this.handleClick1}>
               sort By ID
                </button>
                <button onClick={this.handleClick2}>
               sort By Creation Date
                </button>
            
         
        </table>
        </div>
      );
    }
  }
  export default reviewerCases;
