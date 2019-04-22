import React, { Component } from 'react';
  import axios from 'axios';
  import jwt from 'jsonwebtoken';
  import tokenkey from '../config/keys'
  class lawyerCases extends Component {
      state={
          lawyerCases:[],
         
          username: ''
      }

      handleClick1 = () => {

       
      this.state.lawyerCases.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0)); 

      this.setState({ lawyerCases: this.state.lawyerCases })
    
     }
      handleClick2 = () => {
       
      this.state.lawyerCases.sort((a,b) => (a.created_at > b.created_at) ? 1 : ((b.created_at > a.created_at) ? -1 : 0)); 
      this.setState({ lawyerCases: this.state.lawyerCases })
   
   }
  

      
      componentDidMount(){
        jwt.verify(localStorage.getItem('token'),tokenkey.secretkey,(err,payload) =>{
          if(err){
            alert('please make sure you are logged in')
            document.location.href = '/loginemployee'
        }else{
          console.log(payload.type)
       axios.get('http://localhost:3002/api/lawyer/getCases/'+payload.username,{headers:{'Authorization' : `Bearer ${localStorage.getItem('token')}`}}).then(res => Object.values(res)[0]).then(element =>
       { 
        if(element.msg===undefined){ 
         this.setState({lawyerCases:element.data})
        }
        else{
          alert(element.msg)
        }
      })
      }})
      }
    render() {

      return(
        <div className="lawyeCases">
        <h1>lawyer Cases Status</h1>
        <br/>
        <table>
          <thead>
            <tr>
  
            </tr>
          </thead>
          <tbody>
            { this.state.lawyerCases.map((lawyerCases) => {
              return(
                <tr>
                  <td>{<h5><div>CaseID: {lawyerCases._id}</div>
                  <div> Case Status: {lawyerCases.status}</div>
                  <div> Investor: {lawyerCases.investor}</div>
                  <div> Reviewer:  {lawyerCases.reviewer}</div>
                  <div> Lawyer: {lawyerCases.lawyer}</div>
                  <div>Company Name: {lawyerCases.company_name}</div>
                  <div> reviewed by lawyer:  {lawyerCases.reviewed_by_lawyer}</div>
                  <div> Lawyer Comment: {lawyerCases.review_comment_by_lawyer}</div>
                  <div> lawyer comment date: {lawyerCases.review_date_by_lawyer}</div>
                  <div> reviewed by reviewer: {lawyerCases.reviewed_by_reviewer}</div>
                  <div> reviewer comment:  {lawyerCases.review_comment_by_reviewer}</div>
                  <div>reviewer comment date:  {lawyerCases.review_date_by_reviewer}</div>
                  <div> fees: {lawyerCases.fees}</div><div> paid:  {lawyerCases.paid}</div>
                  <div> currency: {lawyerCases.currency}</div>
                  <div>formID: {lawyerCases.formID}</div>
                  <div> priority:  {lawyerCases.priority}</div>
                  <div> description: {lawyerCases.description}</div>
                  <div> created_at: {lawyerCases.created_at}</div>
                  <div> isDone: {lawyerCases.isDone}</div>
                  <div> dueDate:  {lawyerCases.dueDate}</div></h5>}</td>
                </tr>
              )
            })}
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
  
  export default lawyerCases;
    