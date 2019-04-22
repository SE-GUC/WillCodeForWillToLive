import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from 'axios';
import jwt from 'jsonwebtoken'
import tokenkey from '../../config/keys'

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

class investorprofile extends Component {
  state={
    details:[],
    //id:"5cb1c8bd7a390e1a972f5a62",
    updateName:'',
    updateUsername:'',
    updatePassword:'',
    updateEmail:'',
    updateID:'',
    updateTypeOfID:'',
    updateNationality:'',
    updateDateOfBirth:'',
    updateCapital:'',
    updateGender:'',
    updateMobileNumber:'',
    updateAddress:'',
    updateFaxNumber:''
  }
  componentDidMount(){
    jwt.verify(localStorage.getItem('token'),tokenkey.secretkey,(err,payload)=>{
      if(err){
        alert('please make sure you are logged in')
        document.location.href = '/loginemployee'

      }
      else{
        const id= payload.id
        axios.get('http://localhost:3002/api/investor/'+id, {headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => Object.values(res)[0]).then(element => {
        if(element.msg===undefined){  
        this.setState({details:element.data})
      }else{
        alert(element.msg)

        document.location.href = '/loginemployee'

      }
        }
          ).catch(er => alert("something went wrong"))
      }
    })
   }
   updateprofile =(id) =>{
    axios.put('http://localhost:3002/api/investor/'+id,{headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}, {
      username: this.state.updateUsername!==''?this.state.updateUsername:this.state.details.username,
      password: this.state.updatePassword!==''?this.state.updatePassword:this.state.details.password,
      name: this.state.updateName!==''?this.state.updateName:this.state.details.name,
      DOB: this.state.updateDateOfBirth!==''?this.state.updateDateOfBirth:this.state.details.DOB,
      gender: this.state.updateGender!==''?this.state.updateGender:this.state.details.gender,
      nationality: this.state.updateNationality!==''?this.state.updateNationality:this.state.details.nationality,
      ID: this.state.updateID!==''?this.state.updateID:this.state.details.ID,
      typeOfID: this.state.updateTypeOfID!==''?this.state.updateTypeOfID:this.state.details.typeOfID,
      mobileNumber: this.state.updateMobileNumber!==''?parseInt(this.state.updateMobileNumber,10):this.state.details.mobileNumber,
      faxNumber: this.state.updateFaxNumber!==''?parseInt(this.state.updateFaxNumber,10):this.state.details.faxNumber,
      email: this.state.updateEmail!==''?this.state.updateEmail:this.state.details.email,
      address: this.state.updateAddress!==''?this.state.updateAddress:this.state.details.address,
      capital: this.state.updateCapital!==''?parseInt(this.state.updateCapital,10):this.state.details.capital
    }).then(res => Object.values(res)[0]).then(element => alert('updated')).catch(err => alert('something went wrong, make sure you entered valid input'))

   }
   changeState = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }
   deleteprofile =(id) =>{
    axios.delete('http://localhost:3002/api/investor/'+id, {headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => Object.values(res)[0]).then(element => alert('profile deleted')).catch(err => alert('something went wrong'))
  }
    render() {
      const classes = this.props.classes
      return (
        <div className="investorProfile">
          <Router>
            <Switch>

            </Switch>
          </Router>
          <div>
          <table>
        <thead>
      <tr>
      <td>{<h5><div><Button variant="contained" color="secondary" onClick={this.deleteprofile.bind(this,this.state.details._id)}>
        Delete Profile
        <DeleteIcon/>
      </Button>{/*<button onClick={this.deleteprofile.bind(this,this.state.details._id)} >delete profile</button>*/}</div><div> Email: {this.state.details.email}</div><div> Username:  {this.state.details.username}</div><div> ID: {this.state.details.ID}</div><div>Type Of ID: {this.state.details.typeOfID}</div><div> name:  {this.state.details.name}</div><div> nationality: {this.state.details.nationality}</div><div> capital: {this.state.details.capital}</div><div> date of birth: {this.state.details.DOB}</div><div> Mobile Number:  {this.state.details.mobileNumber}</div><div>address:  {this.state.details.address}</div><div>Fax Number:  {this.state.details.faxNumber}</div><div>gender:  {this.state.details.gender}</div></h5>}</td>
      </tr>
        </thead>
        <tbody>    
       
        </tbody>
      </table>
          </div>
          <div>
            <h3>Update Profile</h3>
            <p>Name</p><input type="text" name="updateName" onChange={this.changeState}></input>
            <p>Email</p><input type="email" name="updateEmail" onChange={this.changeState}></input>
            <p>Username</p><input type="text" name="updateUsername" onChange={this.changeState}></input>
            <p>Password</p><input type="password" name="updatePassword" onChange={this.changeState}></input>
            <p>Gender</p><input list="genders" type="text" name="updateGender" onChange={this.changeState}></input>
            <p>ID</p><input type="text" name="updateID" onChange={this.changeState}></input>
            <p>Type Of ID</p><input type="text" name="updateTypeOfID" onChange={this.changeState}></input>
            <p>Nationality</p><input type="text" name="updateNationality" onChange={this.changeState}></input>
            <p>Date of birth</p><input type="date" name="updateDateOfBirth" onChange={this.changeState}></input>
            <p>Capital</p><input type="text" name="updateCapital" onChange={this.changeState}></input>
            <p>Mobile Number</p><input type="number" name="updateMobileNumber" onChange={this.changeState}></input>
            <p>Fax number</p><input type="number" name="updateFaxNumber" onChange={this.changeState}></input>
            <p>Address</p><input type="text" name="updateAddress" onChange={this.changeState}></input>
            <datalist id="genders">
              <option value="Male"></option>
              <option value="Female"></option>
            </datalist>
            <div><p>  </p><Button variant="contained" onClick={this.updateprofile.bind(this,this.state.details._id)}>
        Update Profile
      </Button></div>{/*<button onClick={this.updateprofile.bind(this,this.state.details._id)} >update profile</button>*/}
            <div> <p>  </p><Button variant="contained" color="primary"  onClick ={() =>{
               document.location.href = '/createform'
            }} fullWidth>
        Create a Form
      </Button><p>  </p><Button variant="contained" color="primary" onClick ={() =>{
               document.location.href = '/companies'
            }} fullWidth>
        View Companies
      </Button> 
        <p>  </p>
      <Button variant="contained" color="primary" onClick ={() =>{
               document.location.href = '/investor'
            }}fullWidth>
        View Cases
      </Button><p>  </p>
      <Button variant="contained" color="primary" onClick ={() =>{
              jwt.verify(localStorage.getItem('token'),tokenkey.secretkey,(err,payload)=>{
                if(err){
                  alert(err)

                }
                else{
               document.location.href = '/displayAllForms/' + payload.id
            }})}}fullWidth>
        View Forms
      </Button><p> </p>
      <Button variant="contained" color="secondary" onClick ={() =>{
              localStorage.removeItem('token')
               document.location.href = '/loginemployee'
            }}fullWidth>
        Sign Out
      </Button>
      </div>
          </div>
        </div>
      );
    }
  }
  export default (investorprofile);
