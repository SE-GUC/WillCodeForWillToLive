import React, { Component } from 'react';
import nfetch from 'node-fetch'
//import { Link } from 'react-router-dom';

import axios from 'axios';
class CompaniesA extends Component {
    state={
      id:"5cb1c84c7a390e1a972f5a61",
        Companies:[]
    }
    
    componentDidMount(){
     axios.get('http://localhost:3002/api/investor/comapny/'+this.state.id).then(res => Object.values(res)[0]).then(element => this.setState({Companies:element.data}))
    }
  /*  onSubmit = (e) =>{
      e.preventDefault()
    }
*/
  render() {
    return(
      <div className="Companies">
      <h1>شركات المستثمر</h1>
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
        <td>{<h5>
        <div>هوية الشركة: {Companies._id}</div>
        <div> اسم الشركة: {Companies.CompanyName}</div>
        <div> تاريخ التأسيس: {Companies.EstablishmentDate}</div>
        <div> اسم المستثمر:  {Companies.InvestorName}</div>
        <div> رقم المستثمر: {Companies.InvestorId}</div>
        <div>رأس مال: {Companies.Capital}</div>
        <div> تنظيم القانون:  {Companies.RegulatingLaw}</div>
        <div> نموذج الشركة القانوني: {Companies.CompanyLegalForm}</div>
        <div> محافظة: {Companies.Governorate}</div>
        <div> مدينة: {Companies.City}</div>
        <div> عنوان:  {Companies.Address}</div>
        <div>هاتف:  {Companies.Telephone}</div>
        <div>فاكس: {Companies.Fax}</div>
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

export default CompaniesA;
