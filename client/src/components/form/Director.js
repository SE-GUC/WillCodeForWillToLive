import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'

class Director extends Component {

  constructor (props) {
    super(props)
    this.state = {
      form: {}
    }
    props.pushDirector(this.state.form)
  }

  handleChange = event => {
    let form = this.state.form
    form[event.target.name] = event.target.value
    this.setState({form: form})
  }

  render() {
    return (
      <div className="director">
        <TextField onChange={this.handleChange} name="name" label="Name"/>
        <TextField onChange={this.handleChange} name="type" label="Type"/>
        <TextField onChange={this.handleChange} name="gender" label="Gender"/>
        <TextField onChange={this.handleChange} name="nationality" label="Nationality"/>
        <TextField onChange={this.handleChange} name="idType" label="ID Type"/>
        <TextField onChange={this.handleChange} name="birthdate" label="Birth Date"/>
        <TextField onChange={this.handleChange} name="address" label="Address"/>
        <TextField onChange={this.handleChange} name="position" label="Position"/>
      </div>
    )
  }
}

export default Director