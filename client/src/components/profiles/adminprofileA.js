import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from 'axios'
class adminprofileA extends Component {
  state={
    details:[],
    id:"5cb1efd28bc37b62421b18b8",
    updateFirstName:'',
    updateMiddleName:'',
    updateLastName:'',
    updateUsername:'',
    updatePassword:'',
    updateEmail:'',
    updateNationality:'',
    updateDateOfBirth:'',
    updateGender:'',
    updateMobileNumber:'',
    updateFaxNumber:'',
    updateAddress:''
  }
  componentDidMount(){
    axios.get('http://localhost:3002/api/admin/'+this.state.id).then(res => Object.values(res)[0]).then(element => this.setState({details:element.data}))
   }
   updateprofile =(id) =>{
    axios.put('http://localhost:3002/api/admin/'+id, {
      username: this.state.updateUsername!==''?this.state.updateUsername:this.state.details.username,
      password: this.state.updatePassword!==''?this.state.updatePassword:this.state.details.password,
      firstName: this.state.updateFirstName!==''?this.state.updateFirstName:this.state.details.firstName,
      middleName: this.state.updateMiddleName!==''?this.state.updateMiddleName:this.state.details.middleName,
      lastName: this.state.updateLastName!==''?this.state.updateLastName:this.state.details.lastName,
      DOB: this.state.updateDateOfBirth!==''?this.state.updateDateOfBirth:this.state.details.DOB,
      gender: this.state.updateGender!==''?this.state.updateGender:this.state.details.gender,
      nationality: this.state.updateNationality!==''?this.state.updateNationality:this.state.details.nationality,
      mobileNumber: this.state.updateMobileNumber!==''?parseInt(this.state.updateMobileNumber,10):this.state.details.mobileNumber,
      faxNumber: this.state.updateFaxNumber!==''?parseInt(this.state.updateFaxNumber,10):this.state.details.faxNumber,
      emailAddress: this.state.updateEmail!==''?this.state.updateEmail:this.state.details.emailAddress,
      address: this.state.updateAddress!==''?this.state.updateAddress:this.state.details.address,
    }).then(res => Object.values(res)[0]).then(element => alert('updated')).catch(err => alert('something went wrong, make sure you entered valid input'))

   }
   changeState = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }
   deleteprofile =(id) =>{
    axios.delete('http://localhost:3002/api/admin/'+id).then(res => Object.values(res)[0]).then(element => alert('profile deleted')).catch(err => alert('something went wrong'))
  }
    render() {
      return (
        <div className="admin profile">
          <Router>
            <Switch>

            </Switch>
          </Router>
          <div>
          <table>
        <thead>
      <tr>
      <td>{<h5><div><button onClick={this.deleteprofile.bind(this,this.state.details._id)} >حذف الملف الشخصي</button></div>
      <div> البريد الإلكتروني: {this.state.details.emailAddress}</div>
      <div> اسم المستخدم:  {this.state.details.username}</div>
      <div> اسم:  {this.state.details.firstName+" "+this.state.details.middleName+" "+this.state.details.lastName}</div>
      <div> جنسية: {this.state.details.nationality}</div>
      <div> تاريخ الولادة: {this.state.details.DOB}</div>
      <div> رقم الهاتف المحمول:  {this.state.details.mobileNumber}</div>
      <div> عنوان:  {this.state.details.address}</div>
      <div> رقم الفاكس:  {this.state.details.faxNumber}</div>
      <div> جنس:  {this.state.details.gender}</div></h5>}</td>
      </tr>
        </thead>
        <tbody>    
       
        </tbody>
      </table>
          </div>
          <div>
            <h3>تحديث الملف</h3>
            <p>الاسم الاول</p><input type="text" name="updateFirstName" onChange={this.changeState}></input>
            <p>الاسم الوسطى</p><input type="text" name="updateMiddleName" onChange={this.changeState}></input>
            <p>اسم العائلة</p><input type="text" name="updateLastName" onChange={this.changeState}></input>
            <p>البريد الإلكتروني</p><input type="email" name="updateEmail" onChange={this.changeState}></input>
            <p>اسم المستخدم</p><input type="text" name="updateUsername" onChange={this.changeState}></input>
            <p>كلمه السر</p><input type="password" name="updatePassword" onChange={this.changeState}></input>
            <p>جنس</p><input list="genders" type="text" name="updateGender" onChange={this.changeState}></input>
            <p>جنسية</p><input type="text" name="updateNationality" onChange={this.changeState}></input>
            <p>تاريخ الولادة</p><input type="date" name="updateDateOfBirth" onChange={this.changeState}></input>
            <p>رقم الهاتف المحمول</p><input type="number" name="updateMobileNumber" onChange={this.changeState}></input>
            <p>رقم الفاكس</p><input type="number" name="updateFaxNumber" onChange={this.changeState}></input>
            <p>عنوان</p><input type="text" name="updateAddress" onChange={this.changeState}></input>
            <datalist id="genders">
              <option value="الذكر"></option>
              <option value="إنثة"></option>
            </datalist>
            <div><button onClick={this.updateprofile.bind(this,this.state.details._id)} >تحديث الملف</button></div>
          </div>
        </div>
      );
    }
  }
  export default (adminprofileA);
