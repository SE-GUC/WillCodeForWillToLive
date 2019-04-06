import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class Director extends Component {

  constructor (props) {
    super(props)
    this.props = props
    this.state = {
      form: {},
      index: props.index
    }
    props.funcs.push(this.state.form)
    this.remove = props.funcs.remove
  }

  removeThis = () => {
    this.remove(this.state.index)
  }

  handleChange = event => {
    let form = this.state.form
    form[event.target.name] = event.target.value
    this.setState({form: form})
  }

  render() {
    const classes = this.props.classes
    return (
      <div>
        <h3>Director {this.state.index + 1}</h3>
        <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="name" label="Name"/>
        <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="type" label="Type"/>
        <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="gender" label="Gender"/>
        <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="nationality" label="Nationality"/>
        <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="idType" label="ID Type"/>
        <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="birthdate" label="Birth Date"/>
        <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="address" label="Address"/>
        <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="position" label="Position"/>
      </div>
    )
  }
}

export default Director