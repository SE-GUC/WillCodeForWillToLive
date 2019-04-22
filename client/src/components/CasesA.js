import React, { Component } from 'react';

import axios from 'axios';
class CasesA extends Component {
    state={
        cases:[]
    }
    
    componentDidMount(){
     axios.get('http://localhost:3002/api/cases').then(res => Object.values(res)[0]).then(element => this.setState({cases:element.data}))
    }
  render() {
    return(
      <div className="Cases">
      <h1>الحالات</h1>
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
              <td>{<h5>
              <div>هوية شخصيةالقضية: {cases._id}</div>
              <div> وضع حالة: {cases.status}</div>
              <div> مستثمر: {cases.investor}</div>
              <div> مراجع:  {cases.reviewer}</div>
              <div> المحامية: {cases.lawyer}</div>
              <div>اسم الشركة: {cases.company_name}</div>
              <div> مراجعة من قبل المحامي:  {cases.reviewed_by_lawyer}</div>
              <div> محامي التعليق: {cases.review_comment_by_lawyer}</div>
              <div> تاريخ محامي التعليق: {cases.review_date_by_lawyer}</div>
              <div> استعرضها المراجع: {cases.reviewed_by_reviewer}</div>
              <div> تعليق المراجع:  {cases.review_comment_by_reviewer}</div>
              <div>تاريخ التعليق للمراجع:  {cases.review_date_by_reviewer}</div>
              </h5>}</td>
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

export default CasesA;

/* 
const response = nfetch(`http://localhost:3002/api/admin/getCases`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json' }
    }).then(res => res.json()).then(json => alert(Object.values(json)[0])).catch(err => alert('Something went wrong'))
    */