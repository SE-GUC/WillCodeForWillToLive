import React, { Component } from 'react';
  import axios from 'axios';

  class lawyerCases extends Component {
      state={
          lawyerCases:[],
          lawyerCasesSortedById:[],
          lawyerCasesSortedByCreationDate:[],
          username: "idk"
      }
      
      componentDidMount(){
       
       //axios.get('http://localhost:3002/api/lawyer/getCases/'+this.state.username).then(res => Object.values(res)[0]).then(element => this.setState({lawyerCases:element.data}))
       axios.get('http://localhost:3002/api/lawyer/sortTaskByID/'+this.state.username).then(res => Object.values(res)[0]).then(element => this.setState({lawyerCasesSortedById:element.data}))
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
            { this.state.lawyerCasesSortedById.map((lawyerCasesSortedById) => {
              return(
                <tr>
                  <td>{<h5><div>CaseID: {lawyerCases._id}</div><div> Case Status: {lawyerCases.status}</div><div> Investor: {lawyerCases.investor}</div><div> Reviewer:  {lawyerCases.reviewer}</div><div> Lawyer: {lawyerCases.lawyer}</div><div>Company Name: {lawyerCases.company_name}</div><div> reviewed by lawyer:  {lawyerCases.reviewed_by_lawyer}</div><div> Lawyer Comment: {lawyerCases.review_comment_by_lawyer}</div><div> lawyer comment date: {lawyerCases.review_date_by_lawyer}</div><div> reviewed by reviewer: {lawyerCases.reviewed_by_reviewer}</div><div> reviewer comment:  {lawyerCases.review_comment_by_reviewer}</div><div>reviewer comment date:  {lawyerCases.review_date_by_reviewer}</div></h5>}</td>
                </tr>
              )
            })}
       
         
          </tbody>
        </table>
        </div>
      );
    }
  }
  
  export default lawyerCases;
    