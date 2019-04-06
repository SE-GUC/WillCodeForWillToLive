import React, { Component } from 'react'

class Director extends Component {
  render() {
    return (
      <div className="director">
      <input type="text" name="name" placeholder="Name"/>
              <input type="text" name="type" placeholder="Type"/>
              <input type="text" name="gender" placeholder="Gender"/>
              <input type="text" name="nationality" placeholder="Nationality"/>
              <input type="text" name="idType" placeholder="ID Type"/>
              <input type="text" name="birthdate" placeholder="Birth Date"/>
              <input type="text" name="address" placeholder="Address"/>
              <input type="text" name="position" placeholder="Position"/>
      </div>
    )
  }
}

export default Director