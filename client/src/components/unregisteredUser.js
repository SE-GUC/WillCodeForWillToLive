import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from 'axios'
class UnregisteredUser extends Component {
    state={
        details:[]
    }
    componentDidMount(){
        
        axios.get('http://localhost:3002/api/company').then(res => Object.values(res)[0]).then(element => this.setState({details:element.data}))
    }
    render() {
      return (
        <div className={"UnregisteredUser"}>
          <Router>
            <Switch>
  
            </Switch>
          </Router>
          <h1>Companies</h1>
      <br/>
      <table>
        <thead>
          <tr>

          </tr>
        </thead>
        <tbody>
     
          {this.state.details.map((details)=> {
            return(
              <tr>
              <td>{<h5><div>Company Name: {details.CompanyName}</div><div> Company Type: {details.CompanyType}</div><div> Establishment Date: {details.EstablishmentDate}</div><div> Investor Name:  {details.InvestorName}</div><div> Capital: {details.Capital}</div><div>Regulating Law: {details.RegulatingLaw}</div><div> Company Legal Form:  {details.CompanyLegalForm}</div><div> Governorate: {details.Governorate}</div><div> City: {details.City}</div><div> Address: {details.Address}</div><div> Telephone:  {details.Telephone}</div><div>Fax:  {details.Fax}</div></h5>}</td>
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
  
  
  export default UnregisteredUser;
  