import React, { Component } from 'react';
import nfetch from 'node-fetch'
//import { Link } from 'react-router-dom';

import axios from 'axios';
class Companies extends Component {
    state={
      username:"investor",
        Companies:[]
    }
    
    componentDidMount(){
     axios.get('http://localhost:3002/api/comapny/:'+this.state.username).then(res => Object.values(res)[0]).then(fuck => this.setState({Companies:fuck.data}))
    }
  /*  onSubmit = (e) =>{
      e.preventDefault()
    }
*/
  render() {
    return(
      <div className="Companies">
      <h1>Investor Companies</h1>
      <br/>
      <table>
        <thead>
          <tr>

          </tr>
        </thead>
        <tbody>
     
          {this.state.Companies.map((Companies)=> {
            return(
              <tr>
        <td>{<h5><div>CompanyID: {Companies._id}</div><div> CompanyName: {Companies.CompanyName}</div><div> EstablishmentDate: {Companies.EstablishmentDate}</div><div> InvestorName:  {Companies.InvestorName}</div><div> InvestorId: {Companies.InvestorId}</div><div>Capital: {Companies.Capital}</div><div> RegulatingLaw:  {Companies.RegulatingLaw}</div><div> CompanyLegalForm: {Companies.CompanyLegalForm}</div><div> Governorate: {Companies.Governorate}</div><div> City: {Companies.City}</div><div> Address:  {Companies.Address}</div><div>Telephone:  {Companies.Telephone}</div><div>Fax: {Companies.Fax}</div></h5>}</td>
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

export default Companies;
