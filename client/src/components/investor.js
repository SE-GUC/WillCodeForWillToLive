
  import React, { Component } from 'react';
  import axios from 'axios';

  class investor extends Component {
      state={
          investor:[],
          username: "oooe"
      }
      
      componentDidMount(){
       axios.get('http://localhost:3002/api/investor/getCases/'+this.state.username).then(res => Object.values(res)[0]).then(element => this.setState({investor:element.data}))
      }
    render() {
      return(
        <div className="investor">
        <h1>Cases Status</h1>
        <br/>
        <table>
          <thead>
            <tr>
  
            </tr>
          </thead>
          <tbody>
       
            {this.state.investor.map((investor)=> {
              return(
                <tr>
                <td>{<h5><div>CaseID: {investor._id}</div><div> Case Status: {investor.status}</div><div> Investor: {investor.investor}</div><div> Reviewer:  {investor.reviewer}</div><div> Lawyer: {investor.lawyer}</div><div>Company Name: {investor.company_name}</div><div> reviewed by lawyer:  {investor.reviewed_by_lawyer}</div><div> Lawyer Comment: {investor.review_comment_by_lawyer}</div><div> lawyer comment date: {investor.review_date_by_lawyer}</div><div> reviewed by reviewer: {investor.reviewed_by_reviewer}</div><div> reviewer comment:  {investor.review_comment_by_reviewer}</div><div>reviewer comment date:  {investor.review_date_by_reviewer}</div></h5>}</td>
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
  
  export default investor;
    