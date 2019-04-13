import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import axios from 'axios'
class lawyerprofile extends Component {
  state={
    details:[],
    id:"5cb1e6eb55222b5c6cfeaf3b"
  }
  componentDidMount(){
    axios.get('http://localhost:3002/api/lawyer/'+this.state.id).then(res => Object.values(res)[0]).then(element => this.setState({details:element.data}))
   }
   updateprofile =(id) =>{


   }
   deleteprofile =(id) =>{
    axios.delete('http://localhost:3002/api/lawyer/'+id).then(res => Object.values(res)[0]).then(element => alert('profile deleted')).catch(err => alert('something went wrong'))
  }
    render() {
      return (
        <div className={"lawyer profile"}>
          <Router>
            <Switch>

            </Switch>
          </Router>
          <div>
          <table>
        <thead>
          <tr>
      <tr>
      <td>{<h5><div><button onClick={this.updateprofile.bind(this,this.state.details._id)} >update profile</button></div><div><button onClick={this.deleteprofile.bind(this,this.state.details._id)} >delete profile</button></div><div> Email: {this.state.details.email_address}</div><div> Username:  {this.state.details.username}</div><div> ID: {this.state.details.ID}</div><div>Type Of ID: {this.state.details.typeOfID}</div><div> name:  {this.state.details.name}</div><div> nationality: {this.state.details.nationality}</div><div> date of birth: {this.state.details.birth_date}</div><div> Mobile Number:  {this.state.details.mobile_number}</div><div>Fax Number:  {this.state.details.fax_number}</div><div>gender:  {this.state.details.gender}</div></h5>}</td>
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
  export default (lawyerprofile);
