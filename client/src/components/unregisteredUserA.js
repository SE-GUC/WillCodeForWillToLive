import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from 'axios'
class UnregisteredUserA extends Component {
    state={
        details:[]
    }
    componentDidMount(){
        axios.get('http://localhost:3002/api/company').then(res => Object.values(res)[0]).then(element => this.setState({details:element.data}))
    }
    render() {
      return (
        <div className={"UnregisteredUserA"}>
          <Router>
            <Switch>

            </Switch>
          </Router>
          <h1>الشركات</h1>
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
              <td>{<h5><div>اسم الشركة: {details.CompanyName}</div><div> نوع الشركة: {details.CompanyType}</div><div> تاريخ التأسيس: {details.EstablishmentDate}</div><div> اسم المستثمر:  {details.InvestorName}</div><div> رأس المال: {details.Capital}</div><div>تنظيم القانون: {details.RegulatingLaw}</div><div> الشكل القانوني للشركة:  {details.CompanyLegalForm}</div><div> محافظة: {details.Governorate}</div><div> مدينة: {details.City}</div><div> العنوان: {details.Address}</div><div> هاتف:  {details.Telephone}</div><div> الفاكس:  {details.Fax}</div></h5>}</td>
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


  export default UnregisteredUserA;
