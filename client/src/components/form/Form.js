import React, { Component } from 'react'
import Director from './Director'
import {withStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import styles from './styles'
import axios from 'axios'

class Form extends Component {
  
  constructor(props) {
    super(props)
    this.props = props
    this.state = {
      directors: 0,
      form: {
        boardOfDirectors: []
      }
    }
  }

  addDirector = () => {
    this.setState({directors: this.state.directors+1})
  }

  pushDirector = director => {
    const form = this.state.form
    form.boardOfDirectors.push(director)
    this.setState({form: form})
  }

  handleChange = event => {
    let form = this.state.form
    let [head, ...tail] = event.target.name.split('.')
    const bar = ([head, ...tail], val) => tail.length === 0? {[head]: val} : {[head]: bar(tail, val)}
    form[head] = bar(tail, event.target.value)
    this.setState({form: form})
  }

  createForm = () => {
    axios(`/api/form`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(this.state.form)
    })
    .then(res => console.log('Created form'))
    .catch(error => console.log(error))
  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
            <div id="companyInfo">
              <TextField name="companyInfo" label="Company Information" InputProps={{readOnly: true, disabled: true}} />
              <TextField onChange={this.handleChange} name="companyInfo.RegulatingLaw" label="Regulating Law"/>
              <TextField onChange={this.handleChange} name="companyInfo.companyType" label="Company Type"/>
            </div>
            <div id="companyName">
              <TextField onChange={this.handleChange} name="companyName.arabic" label="Company Name Arabic"/>
              <TextField onChange={this.handleChange} name="companyName.english" label="Company Name English"/>
            </div>
            <div id="hqInfo">
              <TextField onChange={this.handleChange} name="hqInfo.governorate" label="Governorate"/>
              <TextField onChange={this.handleChange} name="hqInfo.city" label="City"/>
              <TextField onChange={this.handleChange} name="hqInfo.telephone" label="Telephone"/>
              <TextField onChange={this.handleChange} name="hqInfo.fax" label="Fax"/>
            </div>
            <div id="investorInfo">
              <TextField onChange={this.handleChange} name="investorInfo.capitalCurrency" label="Capital Currency"/>
              <TextField onChange={this.handleChange} name="investorInfo.capital" label="Capital"/>
              <TextField onChange={this.handleChange} name="investorInfo.name" label="Name"/>
              <TextField onChange={this.handleChange} name="investorInfo.type" label="Type"/>
              <TextField onChange={this.handleChange} name="investorInfo.gender" label="Gender"/>
              <TextField onChange={this.handleChange} name="investorInfo.nationality" label="Nationality"/>
              <TextField onChange={this.handleChange} name="investorInfo.idType" label="ID Type"/>
              <TextField onChange={this.handleChange} name="investorInfo.birthdate" label="Birth Date"/>
              <TextField onChange={this.handleChange} name="investorInfo.telephone" label="Telephone"/>
              <TextField onChange={this.handleChange} name="investorInfo.fax" label="Fax"/>
              <TextField onChange={this.handleChange} name="investorInfo.email" label="Email"/>
              <TextField onChange={this.handleChange} name="investorInfo.address" label="Address"/>
            </div>
          <div id="boardOfDirectors">
            {[...Array(this.state.directors).keys()].map(_ => <Director pushDirector={this.pushDirector.bind(this)} />)}
            <Button onClick={this.addDirector} variant="contained" color="secondary">Add Director</Button>
          </div>
        <div id='submit'>
            <Button onClick={this.createForm} variant="contained" color="primary">Submit</Button>
          </div>
      </div>
    )
  }
}

export default withStyles(styles)(Form)