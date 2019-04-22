import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import tokenkey from '../../config/keys'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';


class adminprofile extends Component {
  state={
    details:[],
    // id:"5cb1efd28bc37b62421b18b8",
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
    jwt.verify(localStorage.getItem('token'),tokenkey.secretkey,(err,payload)=>{
      if(err){
        alert('please make sure you are logged in')
        document.location.href = '/loginemployee'
      }
      else{
        const id= payload.id
        axios.get('http://localhost:3002/api/admin/'+id, {headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => Object.values(res)[0]).then(element => {
        if(element.msg===undefined){
        this.setState({details:element.data})
        }
        else{
          alert(element.msg)
         document.location.href = '/loginemployee'
        }       
        }).catch(er => alert("something went wrong"))
      }
    })
   }
   updateprofile =(id) =>{
    axios.put('http://localhost:3002/api/admin/'+id, {headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}, {
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
    axios.delete('http://localhost:3002/api/admin/'+id, {headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => Object.values(res)[0]).then(element => alert('profile deleted')).catch(err => alert('something went wrong'))
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
      <td>{<h5><div> <Button variant="contained" color="secondary" onClick={this.deleteprofile.bind(this,this.state.details._id)}>
        Delete Profile
        <DeleteIcon/>
      </Button></div>
      {/* <button onClick={this.deleteprofile.bind(this,this.state.details._id)} >delete profile</button></div>*/}<div> Email: {this.state.details.emailAddress}</div><div> Username:  {this.state.details.username}</div><div> name:  {this.state.details.firstName+" "+this.state.details.middleName+" "+this.state.details.lastName}</div><div> nationality: {this.state.details.nationality}</div><div> date of birth: {this.state.details.DOB}</div><div> Mobile Number:  {this.state.details.mobileNumber}</div><div>address:  {this.state.details.address}</div><div>Fax Number:  {this.state.details.faxNumber}</div><div>gender:  {this.state.details.gender}</div></h5>}</td>
      </tr>
        </thead>
        <tbody>    
       
        </tbody>
      </table>
          </div>
          <div>
            <h3>Update Profile</h3>
            <p>First Name</p><input type="text" name="updateFirstName" onChange={this.changeState}></input>
            <p>Middle Name</p><input type="text" name="updateMiddleName" onChange={this.changeState}></input>
            <p>Last Name</p><input type="text" name="updateLastName" onChange={this.changeState}></input>
            <p>Email</p><input type="email" name="updateEmail" onChange={this.changeState}></input>
            <p>Username</p><input type="text" name="updateUsername" onChange={this.changeState}></input>
            <p>Password</p><input type="password" name="updatePassword" onChange={this.changeState}></input>
            <p>Gender</p><input list="genders" type="text" name="updateGender" onChange={this.changeState}></input>
            <p>Nationality</p><input type="text" name="updateNationality" onChange={this.changeState}></input>
            <p>Date of birth</p><input type="date" name="updateDateOfBirth" onChange={this.changeState}></input>
            <p>Mobile Number</p><input type="number" name="updateMobileNumber" onChange={this.changeState}></input>
            <p>Fax number</p><input type="number" name="updateFaxNumber" onChange={this.changeState}></input>
            <p>Address</p><input type="text" name="updateAddress" onChange={this.changeState}></input>
            <datalist id="genders">
              <option value="Male"></option>
              <option value="Female"></option>
            </datalist>
            <div><p>  </p><Button variant="contained" onClick={this.updateprofile.bind(this,this.state.details._id)}>
        Update Profile
       </Button>{/*<button onClick={this.updateprofile.bind(this,this.state.details._id)} >update profile</button>*/}</div> 
            <div> <p>  </p><Button variant="contained" color="primary"  onClick ={() =>{
               document.location.href = '/registerLawyer'
            }} fullWidth>
        Register Lawyer
      </Button><p>  </p><Button variant="contained" color="primary" onClick ={() =>{
               document.location.href = '/registerReviewer'
            }} fullWidth>
        Register Reviewer
      </Button> 
      <p>  </p>
      <Button variant="contained" color="primary" onClick ={() =>{
               document.location.href = '/registerAdmin'
            }} fullWidth>
        Register Admin
      </Button> <p>  </p>
      <Button variant="contained" color="primary" onClick ={() =>{
               document.location.href = '/cases'
            }}fullWidth>
        View Cases
      </Button><p>  </p>
      <Button variant="contained" color="primary" onClick ={() =>{
               document.location.href = '/formTemplate'
            }}fullWidth>
        New Form Templates
      </Button> <p> </p>
      <Button variant="contained" color="secondary" onClick ={() =>{
              localStorage.removeItem('token')
               document.location.href = '/loginemployee'
            }}fullWidth>
        Sign Out
      </Button></div>
          </div>
        </div>
      );
    }
  }
  export default (adminprofile);
