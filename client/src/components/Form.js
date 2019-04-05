import React, { Component } from 'react'
import Director from './Director'

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
    let form = {}
    const divs = document.getElementById('static_form').querySelectorAll('div')
    for(let div of divs) {
      let subForm = {}
      for(let input of div.querySelectorAll('input')){
        subForm[input.name] = input.value
      }
      form[div.id] = subForm
    }
    const directorsDiv = document.getElementById('boardOfDirectors')
    let directors = []
    for(let div of directorsDiv.querySelectorAll('div')) {
      let subForm = {}
      for(let input of div.querySelectorAll('input')){
        subForm[input.name] = input.value
      }
      directors.push(subForm)
    }
    form.boardOfDirectors = directors
    console.log(form)
  }

  render() {
    return (
      <div>
        <div id="form">
          <div id="static_form">
            <div id="companyInfo">
              <input type="text" name="RegulatingLaw" placeholder="Regulating Law"/>
              <input type="text" name="companyType" placeholder="Company Type"/>
            </div>
            <div id="companyName">
              <input type="text" name="arabic" placeholder="Company Name Arabic"/>
              <input type="text" name="english" placeholder="Company Name English"/>
            </div>
            <div id="hqInfo">
              <input type="text" name="governorate" placeholder="Governorate"/>
              <input type="text" name="city" placeholder="City"/>
              <input type="text" name="telephone" placeholder="Telephone"/>
              <input type="text" name="fax" placeholder="Fax"/>
            </div>
            <div id="investorInfo">
              <input type="text" name="capitalCurrency" placeholder="Capital Currency"/>
              <input type="text" name="capital" placeholder="Capital"/>
              <input type="text" name="name" placeholder="Name"/>
              <input type="text" name="type" placeholder="Type"/>
              <input type="text" name="gender" placeholder="Gender"/>
              <input type="text" name="nationality" placeholder="Nationality"/>
              <input type="text" name="idType" placeholder="ID Type"/>
              <input type="text" name="birthdate" placeholder="Birth Date"/>
              <input type="text" name="telephone" placeholder="Telephone"/>
              <input type="text" name="fax" placeholder="Fax"/>
              <input type="text" name="email" placeholder="Email"/>
              <input type="text" name="address" placeholder="Address"/>
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
