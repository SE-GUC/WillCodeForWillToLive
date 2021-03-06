import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import tokenkey from '../../config/keys'
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

class reviewerprofile extends Component {
  state={
    details:[],
    //id:"5cb206b069b2276fc3564814",
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
    jwt.verify(localStorage.getItem('token'),tokenkey.secretkey,(err,payload)=>{
      if(err){
        alert('please make sure you are logged in')
        document.location.href = '/loginemployee'

      }
      else{
        const id= payload.id
        axios.get('http://localhost:3002/api/reviewer/'+id, {headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => Object.values(res)[0]).then(element => {
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
    axios.put('http://localhost:3002/api/reviewer/'+id, {headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}, {
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
    axios.delete('http://localhost:3002/api/reviewer/'+id, {headers:{'Authorization': `Bearer ${localStorage.getItem('token')}`}}).then(res => Object.values(res)[0]).then(element => alert('profile deleted')).catch(err => alert('something went wrong'))
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
            <p>Name</p><input type="text" name="updateName" onChange={this.changeState}></input>
            <p>Email</p><input type="email" name="updateEmail" onChange={this.changeState}></input>
            <p>Username</p><input type="text" name="updateUsername" onChange={this.changeState}></input>
            <p>Password</p><input type="password" name="updatePassword" onChange={this.changeState}></input>
            <p>Gender</p><input list="genders" type="text" name="updateGender" onChange={this.changeState}></input>
            <p>ID</p><input type="text" name="updateID" onChange={this.changeState}></input>
            <p>Type Of ID</p><input type="text" name="updateTypeOfID" onChange={this.changeState}></input>
            <p>Nationality</p><input type="text" name="updateNationality" onChange={this.changeState}></input>
            <p>Date of birth</p><input type="date" name="updateDateOfBirth" onChange={this.changeState}></input>
            <p>Mobile Number</p><input type="text" name="updateMobileNumber" onChange={this.changeState}></input>
            <p>Fax number</p><input type="text" name="updateFaxNumber" onChange={this.changeState}></input>
            <datalist id="genders">
              <option value="Male"></option>
              <option value="Female"></option>
            </datalist>
            <p>  </p><Button variant="contained" onClick={this.updateprofile.bind(this,this.state.details._id)}>
        Update Profile
       </Button>{/*<button onClick={this.updateprofile.bind(this,this.state.details._id)} >update profile</button>*/}</div> 
<div>
      <p>  </p><Button variant="contained" color="primary" onClick ={() =>{
               document.location.href = '/reviewerCases'
            }} fullWidth>
        view cases
      </Button> 
      <p>  </p>
      <Button variant="contained" color="primary" onClick ={() =>{
               document.location.href = '/reviewerassign'
            }} fullWidth>
        assign cases
      </Button> <p>  </p>
      <Button variant="contained" color="primary" onClick ={() =>{
               document.location.href = '/reviewersearch'
            }}fullWidth>
        search Cases
      </Button>
      <p> </p>
      <Button variant="contained" color="primary" onClick ={() =>{
               document.location.href = '/reviewer'
            }}fullWidth>
        Review Cases
      </Button>
      <p> </p>
      <Button variant="contained" color="secondary" onClick ={() =>{
              localStorage.removeItem('token')
               document.location.href = '/loginemployee'
            }}fullWidth>
        Sign Out
      </Button>
          </div>
      </div>
      );
    }
  }
  export default (reviewerprofile);
