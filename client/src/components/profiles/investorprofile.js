import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from 'axios';
class investorprofile extends Component {
  state={
    details:[],
    id:"5cb1c8bd7a390e1a972f5a62",

  }
  componentDidMount(){
    axios.get('http://localhost:3002/api/investor/'+this.state.id).then(res => Object.values(res)[0]).then(element => this.setState({details:element.data}))
   }
   updateprofile =(id) =>{


   }
   deleteprofile =(id) =>{
    axios.delete('http://localhost:3002/api/investor/'+id).then(res => Object.values(res)[0]).then(element => alert('profile deleted')).catch(err => alert('something went wrong'))
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
      <tr>
      <td>{<h5><div><button onClick={this.updateprofile.bind(this,this.state.details._id)} >update profile</button></div><div><button onClick={this.deleteprofile.bind(this,this.state.details._id)} >delete profile</button></div><div> Email: {this.state.details.email}</div><div> Username:  {this.state.details.username}</div><div> ID: {this.state.details.ID}</div><div>Type Of ID: {this.state.details.typeOfID}</div><div> name:  {this.state.details.name}</div><div> nationality: {this.state.details.nationality}</div><div> capital: {this.state.details.capital}</div><div> date of birth: {this.state.details.DOB}</div><div> Mobile Number:  {this.state.details.mobileNumber}</div><div>address:  {this.state.details.address}</div><div>Fax Number:  {this.state.details.faxNumber}</div><div>gender:  {this.state.details.gender}</div></h5>}</td>
      </tr>
          </tr>
        </thead>
        <tbody>    
       
        </tbody>
      </table>
          </div>
        </div>
      );
    }
  }
  export default (investorprofile);
