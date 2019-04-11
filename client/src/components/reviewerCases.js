import React, { Component } from 'react';
  import axios from 'axios';

  class reviewerCases extends Component {
      state={
          reviewerCases:[],
          username: "revv"
      }
      
      componentDidMount(){
       axios.get('http://localhost:3002/api/reviewer/getCases/'+this.state.username).then(res => Object.values(res)[0]).then(element => this.setState({reviewerCases:element.data}))
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
                <td>{<h5><div>CaseID: {reviewerCases._id}</div><div> Case Status: {reviewerCases.status}</div><div> Investor: {reviewerCases.investor}</div><div> Reviewer:  {reviewerCases.reviewer}</div><div> Lawyer: {reviewerCases.lawyer}</div><div>Company Name: {reviewerCases.company_name}</div><div> reviewed by lawyer:  {reviewerCases.reviewed_by_lawyer}</div><div> Lawyer Comment: {reviewerCases.review_comment_by_lawyer}</div><div> lawyer comment date: {reviewerCases.review_date_by_lawyer}</div><div> reviewed by reviewer: {reviewerCases.reviewed_by_reviewer}</div><div> reviewer comment:  {reviewerCases.review_comment_by_reviewer}</div><div>reviewer comment date:  {reviewerCases.review_date_by_reviewer}</div></h5>}</td>
                </tr>
              )
            })
            }
          </tbody>
        </table>
        </div>
      );
    }
  }
  
  export default reviewerCases;
    