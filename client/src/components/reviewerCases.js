import React, { Component } from 'react';
  import axios from 'axios';


  
  class reviewerCases extends Component {
      state={
          reviewerCases:[],
          sortedByID: [],
          sortedByCreationDate: [],
          username: "revv"
      }

      handleClick1 = () => {
       
        // for(var i = 0; i < this.state.sortedByID.length; i++){
        
        //   if(this.state.sortedByID[i].reviewer !== this.state.username){
        //     this.state.sortedByID.splice(i, 1);
        //     i--
           
        //   }
        // }
         
        this.state.reviewerCases.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0)); 

         this.setState({ reviewerCases: this.state.reviewerCases })
       
      }
      handleClick2 = () => {

        // for(var i = 0; i < this.state.sortedByCreationDate.length; i++){
        
        //   if(this.state.sortedByCreationDate[i].reviewer !== this.state.username){
        //     this.state.sortedByCreationDate.splice(i, 1);
        //     i--
           
        //   }
        // }
        this.state.reviewerCases.sort((b,a) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0)); 

        this.setState({ reviewerCases: this.state.reviewerCases })
        // this.setState({ reviewerCases: this.state.sortedByCreationDate })
       
    }


      componentDidMount(){
       axios.get('http://localhost:3002/api/reviewer/getCases/'+this.state.username).then(res => Object.values(res)[0]).then(element => this.setState({reviewerCases:element.data}))
       //axios.get('http://localhost:3002/api/reviewer/sortTaskByID/').then(res => Object.values(res)[0]).then(element => this.setState({sortedByID:element.data}))
       //axios.get('http://localhost:3002/api/reviewer/sortTaskByCreationDate/' ).then(res =>Object.values(res)[0]).then(element=> this.setState({sortedByCreationDate:element.data}))
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
                <td>{<h5><div class='test'>CaseID: {reviewerCases._id}</div><div> Case Status: {reviewerCases.status}</div><div> Investor: {reviewerCases.investor}</div><div> Reviewer:  {reviewerCases.reviewer}</div><div> Lawyer: {reviewerCases.lawyer}</div><div>Company Name: {reviewerCases.company_name}</div><div> reviewed by lawyer:  {reviewerCases.reviewed_by_lawyer}</div><div> Lawyer Comment: {reviewerCases.review_comment_by_lawyer}</div><div> lawyer comment date: {reviewerCases.review_date_by_lawyer}</div><div> reviewed by reviewer: {reviewerCases.reviewed_by_reviewer}</div><div> reviewer comment:  {reviewerCases.review_comment_by_reviewer}</div><div>reviewer comment date:  {reviewerCases.review_date_by_reviewer}</div></h5>}</td>
               
                </tr>
                 
              )
             
            })
          }
           </tbody>
              <button onClick={this.handleClick1}>
               sortByID
                </button>
                <button onClick={this.handleClick2}>
               sortByCreationDate
                </button>
            
         
        </table>
        </div>
      );
    }
  }
  export default reviewerCases;
