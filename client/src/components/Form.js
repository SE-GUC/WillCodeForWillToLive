import React, { Component } from 'react'
import Director from './Director'
import './Form.css'

class Form extends Component {
  
constructor(props) {
  super(props)
  this.state = {
    directors: 0
  }
}

  addDirector = () => {
    const dirs = this.state.directors+1
    this.setState({
      directors: dirs
    })
  }

  createForm = () => {
    const formDiv = document.getElementById('form')
    const staticForm = formDiv.querySelector("#static_form")
    const directorDivs = formDiv.querySelector("#boardOfDirectors").querySelectorAll('.director')
  
    let form = {}
    // Adding static input
    for(let input of staticForm.querySelectorAll('input')) {
      form[input.name] = input.value
    }
    // Adding board of directors
    form.boardOfDirectors = []
    for(let directorDiv of directorDivs){
      let director = {}
      for(let input of directorDiv.querySelectorAll('input')) {
        director[input.name] = input.value
      }
      form.boardOfDirectors.push(director)
    }
    // TODO: Send a post request to backend
  }

  render() {
    return (
      <div>
        <div id="form">
        <div id="static_form">
          <input type="text" name="RegulatingLaw" placeholder="Regulating Law"/>
          <input type="text" name="companyType" placeholder="Company Type"/>
          <div id="companyName">
            <input type="text" name="companyNameArabic" placeholder="Company Name Arabic"/>
            <input type="text" name="companyNameEnglish" placeholder="Company Name English"/>
          </div>
          <div id="hqInfo">
            <input type="text" name="hqGovernorate" placeholder="Governorate"/>
            <input type="text" name="hqCity" placeholder="City"/>
            <input type="text" name="hqTelephone" placeholder="Telephone"/>
            <input type="text" name="hqFax" placeholder="Fax"/>
          </div>
          <div id="investorInfo">
            <input type="text" name="capitalCurrency" placeholder="Capital Currency"/>
            <input type="text" name="capital" placeholder="Capital"/>
            <input type="text" name="investorName" placeholder="Name"/>
            <input type="text" name="investorType" placeholder="Type"/>
            <input type="text" name="investorGender" placeholder="Gender"/>
            <input type="text" name="investorNationality" placeholder="Nationality"/>
            <input type="text" name="investorIdType" placeholder="ID Type"/>
            <input type="text" name="investorBirthdate" placeholder="Birth Date"/>
            <input type="text" name="investorTelephone" placeholder="Telephone"/>
            <input type="text" name="investorFax" placeholder="Fax"/>
            <input type="text" name="investorEmail" placeholder="Email"/>
            <input type="text" name="investorAddress" placeholder="Address"/>
          </div>
          </div>
          <div id="boardOfDirectors">
            <button id="addDirector" onClick={this.addDirector}>Add Director</button>
            {[...Array(this.state.directors).keys()].map(_ => <Director/>)}
          </div>
        </div>
        <div id='submit'>
            <button name='submit' onClick={this.createForm}>Submit</button>
          </div>
      </div>
    )
  }
}

export default Form
