import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from 'axios'
class reviewerprofileA extends Component {
  state={
    details:[],
    id:"5cb206b069b2276fc3564814",
    updateName:'',
    updateUsername:'',
    updatePassword:'',
    updateEmail:'',
    updateID:'',
    updateTypeOfID:'',
    updateNationality:'',
    updateDateOfBirth:'',
    updateGender:'',
    updateMobileNumber:'',
    updateFaxNumber:''
  }
  componentDidMount(){
    axios.get('http://localhost:3002/api/reviewer/'+this.state.id).then(res => Object.values(res)[0]).then(element => this.setState({details:element.data}))
   }
   updateprofile =(id) =>{
    axios.put('http://localhost:3002/api/reviewer/'+id, {
      username: this.state.updateUsername!==''?this.state.updateUsername:this.state.details.username,
      password: this.state.updatePassword!==''?this.state.updatePassword:this.state.details.password,
      name: this.state.updateName!==''?this.state.updateName:this.state.details.name,
      birth_date: this.state.updateDateOfBirth!==''?this.state.updateDateOfBirth:this.state.details.birth_date,
      gender: this.state.updateGender!==''?this.state.updateGender:this.state.details.gender,
      nationallity: this.state.updateNationality!==''?this.state.updateNationality:this.state.details.nationallity,
      ID: this.state.updateID!==''?this.state.updateID:this.state.details.ID,
      type_of_ID: this.state.updateTypeOfID!==''?this.state.updateTypeOfID:this.state.details.type_of_ID,
      mobile_number: this.state.updateMobileNumber!==''?this.state.updateMobileNumber:this.state.details.mobile_number,
      fax_number: this.state.updateFaxNumber!==''?this.state.updateFaxNumber:this.state.details.fax_number,
      email: this.state.updateEmail!==''?this.state.updateEmail:this.state.details.email
    }).then(res => Object.values(res)[0]).then(element => alert('updated')).catch(err => alert('something went wrong, make sure you entered valid input'))
   }
   changeState = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }
   deleteprofile =(id) =>{
    axios.delete('http://localhost:3002/api/reviewer/'+id).then(res => Object.values(res)[0]).then(element => alert('profile deleted')).catch(err => alert('something went wrong'))
  }
    render() {
      return (
        <div className="reviewer profile">
          <Router>
            <Switch>

            </Switch>
          </Router>
          <div>
          <table>
        <thead>
      <tr>
      <td>{<h5><div><button onClick={this.updateprofile.bind(this,this.state.details._id)} >تحديث الملف</button>
      </div><div><button onClick={this.deleteprofile.bind(this,this.state.details._id)} >حذف الملف الشخصي</button></div>
      <div> البريد الإلكتروني: {this.state.details.email}</div>
      <div> اسم المستخدم:  {this.state.details.username}</div>
      <div> هوية شخصية: {this.state.details.ID}</div>
      <div>نوع الهوية: {this.state.details.type_of_ID}</div>
      <div> اسم:  {this.state.details.name}</div>
      <div> جنسية: {this.state.details.nationallity}</div>
      <div> تاريخ الولادة: {this.state.details.birth_date}</div>
      <div> رقم الهاتف المحمول:  {this.state.details.mobile_number}</div>
      <div>رقم الفاكس:  {this.state.details.fax_number}</div>
      <div>جنس:  {this.state.details.gender}</div>
      <div>عنوان:  {this.state.details.address}</div></h5>}</td>
      </tr>
        </thead>
        <tbody>    
       
        </tbody>
      </table>
          </div>
          <div>
            <h3>تحديث الملف</h3>
            <p>اسم</p><input type="text" name="updateName" onChange={this.changeState}></input>
            <p>البريد الإلكتروني</p><input type="email" name="updateEmail" onChange={this.changeState}></input>
            <p>اسم المستخدم</p><input type="text" name="updateUsername" onChange={this.changeState}></input>
            <p>كلمه السر</p><input type="password" name="updatePassword" onChange={this.changeState}></input>
            <p>جنس</p><input list="genders" type="text" name="updateGender" onChange={this.changeState}></input>
            <p>هوية شخصية</p><input type="text" name="updateID" onChange={this.changeState}></input>
            <p>نوع الهوية</p><input type="text" name="updateTypeOfID" onChange={this.changeState}></input>
            <p>جنسية</p><input type="text" name="updateNationality" onChange={this.changeState}></input>
            <p>تاريخ الولادة</p><input type="date" name="updateDateOfBirth" onChange={this.changeState}></input>
            <p>رقم الهاتف المحمول</p><input type="text" name="updateMobileNumber" onChange={this.changeState}></input>
            <p>رقم الفاكس</p><input type="text" name="updateFaxNumber" onChange={this.changeState}></input>
            <datalist id="genders">
              <option value="الذكر"></option>
              <option value="أنثى"></option>
            </datalist>
            <div><button onClick={this.updateprofile.bind(this,this.state.details._id)} >تحديث الملف</button></div>
          </div>
        </div>
      );
    }
  }
  export default (reviewerprofileA);
