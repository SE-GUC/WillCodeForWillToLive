import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import tokenkey from '../../config/keys'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

  class lawyerCasesA extends Component {
      state={
          lawyerCases:[],
         
          username: "omarr"
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
                  <td>{<h5>
                  <div>ID القضية: {lawyerCases._id}</div>
                  <div> وضع حالة: {lawyerCases.status}</div>
                  <div> مستثمر: {lawyerCases.investor}</div>
                  <div> مراجع:  {lawyerCases.reviewer}</div>
                  <div> المحامية: {lawyerCases.lawyer}</div>
                  <div>اسم الشركة: {lawyerCases.company_name}</div>
                  <div> مراجعة من قبل المحامي:  {lawyerCases.reviewed_by_lawyer}</div>
                  <div> تعليق المحامي: {lawyerCases.review_comment_by_lawyer}</div>
                  <div> تاريخ تعليق المحامي: {lawyerCases.review_date_by_lawyer}</div>
                  <div> استعرضها المراجع: {lawyerCases.reviewed_by_reviewer}</div>
                  <div> تعليق المراجع:  {lawyerCases.review_comment_by_reviewer}</div>
                  <div>تاريخ تعليقات المراجع:  {lawyerCases.review_date_by_reviewer}</div>
                  <div> رسوم: {lawyerCases.fees}</div><div> paid:  {lawyerCases.paid}</div>
                  <div> عملة: {lawyerCases.currency}</div>
                  <div>معرف النموذج: {lawyerCases.formID}</div>
                  <div> أفضلية:  {lawyerCases.priority}</div>
                  <div> وصف: {lawyerCases.description}</div>
                  <div> أنشئت في: {lawyerCases.created_at}</div>
                  <div> تم?: {lawyerCases.isDone}</div>
                  <div> تاريخ الاستحقاق:  {lawyerCases.dueDate}</div></h5>}</td>
                </tr>
              )
            })}
             </tbody>
              <button onClick={this.handleClick1}>
              فرز حسب المعرف

                </button>
                <button onClick={this.handleClick2}>
                فرز حسب تاريخ الإنشاء

                </button>
       
        </table>
        </div>
      );
    }
  }
  
  export default lawyerCasesA;
    