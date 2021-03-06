
  import React, { Component } from 'react';
  import axios from 'axios';
  import Header from './layout/InvestorHeader'
  import { Link } from 'react-router-dom';
  import InvestorDistributionA from './InvestorDistributionA'

  class investorA extends Component {
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
    
            }).catch(err => {alert('please make sure you are logged in');
            document.location.href = '/loginemployee'})
    
           console.log('State: '+ this.state.cases)
      }
      render() {
        return (
        <div>
        <div className = "container">
         <Header />
           <React.Fragment>
           <InvestorDistributionA cases = {this.state.cases}
           payFees = {this.payFees}
       />
           </React.Fragment>
        </div>
        </div>
        )
        }

        payFees = (id) => {
            this.setState({
              cases: this.state.cases.map(cas => {
                if(cas._id === id){
                  let URL = `http://localhost:3002/api/investor/getCases/${id}`
                  axios.put(URL,{
                    fees: "0",
                    paid: true
                  },{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}})
                  cas.fees = 0
                  cas.paid = true
                }
                return cas
              })
            })
         } 
  
  }
  
  export default investorA;
    