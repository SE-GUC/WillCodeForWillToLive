import React, { Component } from 'react';
// import nfetch from 'node-fetch'
import axios from 'axios';
import jwt from 'jsonwebtoken';
import tokenkey from '../config/keys'

class reviewer extends Component {
    state={
        cases:[],
        username: "-"
    }

    componentDidMount(){
     axios.get('http://localhost:3002/api/reviewer/getCases',{headers:{'Authorization' : `Bearer ${localStorage.getItem('token')}`}}).then(res => Object.values(res)[0]).then(element => {
     if(element.msg===undefined){
     this.setState({cases:element.data})
    }else{
      alert(element.msg)
    }
    
    })
    }
    assigncase =(id) =>{
      //console.log(id)
      jwt.verify(localStorage.getItem('token'),tokenkey.secretkey,(err,payload) =>{
        if(err){
          alert('please make sure you are logged in')
          document.location.href = '/loginemployee'
      }else{
      axios.put('http://localhost:3002/api/reviewer/assigncasestomyselfthereviewer/'+id, {
        reviewer: payload.username
    },{headers:{'Authorization' : `Bearer ${localStorage.getItem('token')}`}}).then(res => Object.values(res)[0]).then(element => alert('case assigned')).catch(err => alert('case unavailable'))
      } 
  })}
  render() {
    return(
      <div className="reviewer">
      <h2>reviewer cases</h2>
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
              <td>{<h5><div>CaseID: {cases._id}</div><div><button onClick={this.assigncase.bind(cases._id)} >assigncase</button></div><div> Case Status: {cases.status}</div><div> Investor: {cases.investor}</div><div> Reviewer:  {cases.reviewer}</div><div> Lawyer: {cases.lawyer}</div><div>Company Name: {cases.company_name}</div><div> reviewed by lawyer:  {cases.reviewed_by_lawyer}</div><div> Lawyer Comment: {cases.review_comment_by_lawyer}</div><div> lawyer comment date: {cases.review_date_by_lawyer}</div><div> reviewed by reviewer: {cases.reviewed_by_reviewer}</div><div> reviewer comment:  {cases.review_comment_by_reviewer}</div><div>reviewer comment date:  {cases.review_date_by_reviewer}</div></h5>}</td>
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

export default reviewer;
