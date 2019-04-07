import React, { Component } from 'react';


class inputRegister extends Component {
    state = {
     name: '',
    username: '',
    password: '',
    dob: '',
    gender: '',
    nationality: '',
    typeofid: '',
    mobile:'',
    fax: '',
    email: '',
    address:''
    }

    onChange = (e) =>{
        console.log(e.target.value)
        var par = e.target.name
        var val = e.target.value
        this.setState({[e.target.name]: e.target.value})
        this.props.changeState(par,val)
        // console.log(this.state)

    }
    render() {
      return (
        <input name= {this.props.nameofInput} type={this.props.typeofInput} placeholder={this.props.placeholderofInput} onChange = {this.onChange}/>
     
      );
    }
  }
  export default inputRegister;
