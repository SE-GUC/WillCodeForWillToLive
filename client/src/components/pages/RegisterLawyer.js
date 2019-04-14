import React, { Component } from 'react';
import Header from '../layout/RegisterLawyerHeader'
import InputField from '../inputFields/inputRegister'
import nfetch from 'node-fetch'

class RegisterLawyer extends Component {
  state = {
    name: '',
    username: '',
    password: '',
    dob: '',
    gender: '',
    nationality: '',
    ID:'',
    typeofid: '',
    mobile:'',
    fax: '',
    email: ''
  }
  
onSubmit = (e) =>{
  e.preventDefault();
  const requestBody = {
    name: this.state.name,
    birth_date: this.state.dob,
    gender: this.state.gender,
    nationality: this.state.nationality,
    typeOfID: this.state.typeofid,
    mobile_number: this.state.mobile,
    fax_number: this.state.fax,
    email_address: this.state.email,
    username: this.state.username,
    password: this.state.password,
    ID: this.state.ID
  }
  const response =nfetch(`http://localhost:3002/api/admin/createlawyer`,{
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {'Content-Type': 'application/json' }
    }).then(res => res.json()).then(json => alert(Object.values(json)[0])).catch(err => alert('Something went wrong'))
    
}

  changeState = (par,val) =>{
    this.setState({[par]: val})
  }
  render() {
      return (
        <div className="RegisterLawyer">
         <Header />
        <form onSubmit={this.onSubmit}>
          <p>Name </p><InputField nameofInput = {"name"} typeofInput = {"text"} placeholderofInput={"Name"} changeState = {this.changeState}/>
          <p>Username </p><InputField nameofInput = {"username"} typeofInput = {"text"} placeholderofInput={"Username"} changeState = {this.changeState}/>
          <p>Password </p><InputField nameofInput = {"password"} typeofInput = {"text"} placeholderofInput={"Password"} changeState = {this.changeState}/>
          <p>Date of Birth </p><InputField nameofInput = {"dob"} typeofInput = {"date"} placeholderofInput={"Date"} changeState = {this.changeState}/>
          <p>Gender </p><InputField nameofInput = {"gender"} typeofInput = {"text"} placeholderofInput={"Gender"} changeState = {this.changeState}/>
          <p>Nationality </p><InputField nameofInput = {"nationality"} typeofInput = {"text"} placeholderofInput={"Nationality"} changeState = {this.changeState}/>
          <p>OD </p><InputField nameofInput = {"ID"} typeofInput = {"text"} placeholderofInput={"ID"} changeState = {this.changeState}/>
          <p>Type of ID </p><InputField nameofInput = {"typeofid"} typeofInput = {"text"} placeholderofInput={"Type of ID"} changeState = {this.changeState}/>
          <p>Mobile Number </p><InputField nameofInput = {"mobile"} typeofInput = {"text"} placeholderofInput={"Mobile Number"} changeState = {this.changeState}/>
          <p>Fax Number </p><InputField nameofInput = {"fax"} typeofInput = {"text"} placeholderofInput={"Fax Number"} changeState = {this.changeState}/>
          <p>Email </p><InputField nameofInput = {"email"}typeofInput = {"email"} placeholderofInput={"Email"} changeState = {this.changeState}/>
          <p> </p>
          <input 
          type="submit" 
          value="Submit" 
          className="btn"
          style={{flex: '1'}}
        />
        </form>
        </div>
      );
    }
  }
  
  export default RegisterLawyer;
  
