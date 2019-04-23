import React, { Component } from 'react';
  import axios from 'axios';


  
  class reviewerCasesA extends Component {
      state={
          reviewerCases:[],
          username: "hadilee"
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
        if(err){alert('please make sure you are logged in')
        document.location.href = '/loginemployee'
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
                <td>{<h5>
                <div>ID القضية: {reviewerCases._id}</div>
                <div> وضع حالة: {reviewerCases.status}</div>
                <div> مستثمر: {reviewerCases.investor}</div>
                <div> مراجع:  {reviewerCases.reviewer}</div>
                <div> المحامية: {reviewerCases.lawyer}</div>
                <div>اسم الشركة: {reviewerCases.company_name}</div>
                <div> مراجعة من قبل المحامي:  {reviewerCases.reviewed_by_lawyer}</div>
                <div> تعليق المحامي: {reviewerCases.review_comment_by_lawyer}</div>
                <div> تاريخ محامي التعليق: {reviewerCases.review_date_by_lawyer}</div>
                <div> استعرضها المراجع: {reviewerCases.reviewed_by_reviewer}</div>
                <div> تعليق المراجع:  {reviewerCases.review_comment_by_reviewer}</div>
                <div>تاريخ التعليق للمراجع:  {reviewerCases.review_date_by_reviewer}</div>
                <div> رسوم: {reviewerCases.fees}</div><div> paid:  {reviewerCases.paid}</div>
                <div> عملة: {reviewerCases.currency}</div>
                <div>معرف النموذج: {reviewerCases.formID}</div>
                <div> أفضلية:  {reviewerCases.priority}</div>
                <div> وصف: {reviewerCases.description}</div>
                <div> أنشئت في: {reviewerCases.created_at}</div>
                <div> تم?: {reviewerCases.isDone}</div>
                <div> تاريخ الاستحقاق:  {reviewerCases.dueDate}</div></h5>}</td>
               
                </tr>
                 
              )
             
            })
          }
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
  export default reviewerCasesA;
