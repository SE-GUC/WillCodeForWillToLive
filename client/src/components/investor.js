
  import React, { Component } from 'react';
  import axios from 'axios';
  import Header from './layout/InvestorHeader'
  import { Link } from 'react-router-dom';
  import InvestorDistribution from './InvestorDistribution'

  class investor extends Component {
      state={
          cases :[]
      }
      
      componentDidMount(){
       axios.get('http://localhost:3002/api/investor/getCases', {headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => Object.values(res)[0]).then(element => {
        if(element.msg===undefined){  
       this.setState({cases :element.data})
        }else{
          alert(element.msg)
        }
        })
       console.log('State: '+ this.state.cases)
      }
      render() {
        return (
        <div>
        <div className = "container">
         <Header />
           <React.Fragment>
           <InvestorDistribution cases = {this.state.cases}
           payFees = {this.payFees}
       />
           </React.Fragment>
        </div>
        </div>
        )
        }

       payFees = (id) => {
        let _case = null
        axios.get(`/api/cases/${id}`)
        .then(({case2}) => _case = case2)
        .catch(error => alert(error))
        if(!_case) {
          return
        }
        const newState = this.state.cases
        newState.splice(newState.findIndex(({_id})=>_id === id), 1, _case)
        this.setState({cases: newState})       } 
  
  }
  
  export default investor;
    