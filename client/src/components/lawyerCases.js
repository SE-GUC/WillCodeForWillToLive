import React, { Component } from 'react';
  import axios from 'axios';

  class lawyerCases extends Component {
      state={
          lawyerCases:[],
          sortedByID: [],
          sortedByCreationDate: [],
          username: "omarr"
      }

      handleClick1 = () => {

        // for(var i = 0; i < this.state.sortedByID.length; i++){
        
        //   if(this.state.sortedByID[i].lawyer !== this.state.username){
        //     this.state.sortedByID.splice(i, 1);
        //     i--
           
        //   }
        // }
      this.state.lawyerCases.sort((a,b) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0)); 

      this.setState({ lawyerCases: this.state.lawyerCases })
    
     }
      handleClick2 = () => {
        // for(var i = 0; i < this.state.sortedByCreationDate.length; i++){
        
        //   if(this.state.sortedByCreationDate[i].lawyer !== this.state.username){
        //     this.state.sortedByCreationDate.splice(i, 1);
        //     i--
           
        //   }

      this.state.lawyerCases.sort((b,a) => (a._id > b._id) ? 1 : ((b._id > a._id) ? -1 : 0)); 
      this.setState({ lawyerCases: this.state.lawyerCases })
   
   }
  

      
      componentDidMount(){
       
       axios.get('http://localhost:3002/api/lawyer/getCases/'+this.state.username).then(res => Object.values(res)[0]).then(element => this.setState({lawyerCases:element.data}))
       //axios.get('http://localhost:3002/api/lawyer/sortTaskByID/').then(res => Object.values(res)[0]).then(element => this.setState({sortedByID:element.data}))
       //axios.get('http://localhost:3002/api/lawyer/sortTaskByCreationDate/').then(res =>Object.values(res)[0]).then(element=> this.setState({sortedByCreationDate:element.data}))
         
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
                  <td>{<h5><div>CaseID: {lawyerCases._id}</div><div> Case Status: {lawyerCases.status}</div><div> Investor: {lawyerCases.investor}</div><div> Reviewer:  {lawyerCases.reviewer}</div><div> Lawyer: {lawyerCases.lawyer}</div><div>Company Name: {lawyerCases.company_name}</div><div> reviewed by lawyer:  {lawyerCases.reviewed_by_lawyer}</div><div> Lawyer Comment: {lawyerCases.review_comment_by_lawyer}</div><div> lawyer comment date: {lawyerCases.review_date_by_lawyer}</div><div> reviewed by reviewer: {lawyerCases.reviewed_by_reviewer}</div><div> reviewer comment:  {lawyerCases.review_comment_by_reviewer}</div><div>reviewer comment date:  {lawyerCases.review_date_by_reviewer}</div></h5>}</td>
                </tr>
              )
            })}
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
  
  export default lawyerCases;
    