
  import React, { Component } from 'react';
  import axios from 'axios';

  class investor extends Component {
      state={
          investor:[]
      }
      
      componentDidMount(){
       axios.get('http://localhost:3002/api/investor').then(res => Object.values(res)[0]).then(element => this.setState({investor:element.data}))
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
                <td>{<h5><div>InvestorUsername: {investor._id}</div><div> Case Status: {investor.status}</div><div> Investor: {investor.investor}</div></h5>}</td>
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
    