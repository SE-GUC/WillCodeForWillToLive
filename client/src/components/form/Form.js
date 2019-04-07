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

  directorFuncs = {
    push: director => {
      const form = this.state.form
      form.boardOfDirectors.push(director)
      this.setState({form: form})
    },
    remove: (index) => {
      const form = this.state.form
      form.boardOfDirectors.splice(index, 1)
      this.setState({
        directors: this.state.directors-1,
        form: form
      })
    },
    pop: () => {
      const form = this.state.form
      form.boardOfDirectors.pop()
      this.setState({
        directors: this.state.directors-1,
        form: form
      })
    }
  }

  addDirector = () => {
    this.setState({directors: this.state.directors+1})
  }

  handleChange = event => {
    let form = this.state.form
    let list = event.target.name.split('.')
    const helper = (accu, [head, ...tail], val) => {
      if(!accu[head]) {
        accu[head] = {}
      }
      if(tail.length !== 0){
        helper(accu[head], tail, val)
      } else {
        accu[head] = val
      }
    }
    helper(form, list, event.target.value)
    this.setState({form: form})
  }

  createForm = () => {
    const form = this.state.form
    axios(`/api/form`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      data: form
    })
    .then(res => console.log('Created form'))
    .catch(error => console.log(error))
  }

  render() {
    const {classes} = this.props
    let removeButton
    if (this.state.directors !== 0) {
      removeButton = <Button className={classes.button} variant="contained" onClick={this.directorFuncs.pop} >Remove</Button>
    }
    return (
      <div className={classes.form}>
          <div>
            <h2>Company Information</h2>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="companyLegalInfo.regulatingLaw" label="Regulating Law"/>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="companyLegalInfo.companyType" label="Company Type"/>
          </div>
          <div>
            <h2>Company Name</h2>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="companyName.arabic" label="Company Name Arabic"/>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="companyName.english" label="Company Name English"/>
          </div>
          <div>
            <h2>Headquaters Information</h2>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="hqInfo.governorate" label="Governorate"/>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="hqInfo.city" label="City"/>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="hqInfo.telephone" label="Telephone"/>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="hqInfo.fax" label="Fax"/>
          </div>
          <div>
            <h2>Investor Information</h2>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="investorInfo.capitalCurrency" label="Capital Currency"/>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="investorInfo.capital" label="Capital"/>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="investorInfo.name" label="Name"/>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="investorInfo.type" label="Type"/>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="investorInfo.gender" label="Gender"/>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="investorInfo.nationality" label="Nationality"/>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="investorInfo.idType" label="ID Type"/>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="investorInfo.idNumber" label="ID Number"/>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="investorInfo.birthdate" label="Birth Date"/>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="investorInfo.telephone" label="Telephone"/>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="investorInfo.fax" label="Fax"/>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="investorInfo.email" label="Email"/>
            <TextField className={classes.textField} variant="outlined" onChange={this.handleChange} name="investorInfo.address" label="Address"/>
          </div>
          <div id="boardOfDirectors">
            <h2>Board of Directors</h2>
            {[...Array(this.state.directors).keys()].map((_, i) => <Director key={i} index={i} classes={this.props.classes} funcs={this.directorFuncs}/>)}
            {removeButton}
            <Button className={classes.button} onClick={this.addDirector} variant="contained" color="secondary">Add Director</Button>
          </div>
          <div id='submit'>
            <Button className={classes.button} onClick={this.createForm} variant="contained" color="primary">Submit</Button>
          </div>
      </div>
    )
  }
}

export default withStyles(styles)(Form)