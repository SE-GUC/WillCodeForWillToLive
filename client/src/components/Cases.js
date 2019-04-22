import React, { Component } from 'react';
import jwt from 'jsonwebtoken'
import tokenkey from '../config/keys'
import axios from 'axios';
class Cases extends Component {
    state={
        cases:[]
    }
    
    componentDidMount(){
     axios.get('http://localhost:3002/api/cases', {headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => Object.values(res)[0]).then(element => {
      if(element.msg===undefined){     
     this.setState({cases:element.data})
    }else{
      alert(element.msg)
    }
      }).catch(err => {alert('please make sure you are logged in');
      document.location.href = '/loginemployee'})
    }
  render() {
    return(
      <div className="Cases">
      <h1>Cases</h1>
      <br/>
      <table>
        <thead>
          <tr>

          </tr>
        </thead>
        <tbody>
     
          {this.state.cases.map((cases)=> {
            return(
              <tr>
              <td>{<h5><div>CaseID: {cases._id}</div><div> Case Status: {cases.status}</div><div> Investor: {cases.investor}</div><div> Reviewer:  {cases.reviewer}</div><div> Lawyer: {cases.lawyer}</div><div>Company Name: {cases.company_name}</div><div> reviewed by lawyer:  {cases.reviewed_by_lawyer}</div><div> Lawyer Comment: {cases.review_comment_by_lawyer}</div><div> lawyer comment date: {cases.review_date_by_lawyer}</div><div> reviewed by reviewer: {cases.reviewed_by_reviewer}</div><div> reviewer comment:  {cases.review_comment_by_reviewer}</div><div>reviewer comment date:  {cases.review_date_by_reviewer}</div></h5>}</td>
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

export default Cases;

/* 
const response = nfetch(`http://localhost:3002/api/admin/getCases`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json' }
    }).then(res => res.json()).then(json => alert(Object.values(json)[0])).catch(err => alert('Something went wrong'))
    */