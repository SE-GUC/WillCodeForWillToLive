import React, { Component } from 'react';
import nfetch from 'node-fetch'
import jwt from 'jsonwebtoken'
import tokenkey from '../config/keys'
//import { Link } from 'react-router-dom';

import axios from 'axios';
class CompaniesA extends Component {
    state={
      id:"5cb1c84c7a390e1a972f5a61",
        Companies:[]
    }
    
    componentDidMount(){
      jwt.verify(localStorage.getItem('token'),tokenkey.secretkey,(err,payload)=>{
        if(err){

          alert('please make sure you are logged in')
        document.location.href = '/loginemployee'

        }
        else{
          const id= payload.id
          axios.get('http://localhost:3002/api/investor/comapny/'+id, {headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => Object.values(res)[0]).then(element => {
            if(element.msg===undefined){  
          this.setState({details:element.data})
            } else{
              alert(element.msg)
            }
          }).catch(er => alert("something went wrong"))
        }
      })
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
