const Admin = require('../models/admin')
const nfetch = require('node-fetch')
class AdminsTest {
  constructor (PORT, ROUTE) {
    this.base_url = `http://localhost:${PORT}/api/${ROUTE}`
    this.sharedState = {}
    this.runIndependently = this.runIndependently.bind(this)
    this.postRequestIndependently = this.postRequestIndependently.bind(this)
    this.getRequestIndependently = this.getRequestIndependently.bind(this)
    this.putRequestIndependently = this.putRequestIndependently.bind(this)
    this.deleteRequestIndependently = this.deleteRequestIndependently.bind(this)
    this.sharedState = {
      id: null,
      username: null,
      password: null,
      firstName: null,
      middleName: null,
      lastName: null,
      DOB: null,
      gender: null,
      nationality: null,
      mobileNumber: null,
      faxNumber: null,
      emailAddress: null,
      address: null
    }
  }
  runIndependently () {
    try {
      return new Promise((resolve, reject) => {
        describe('Making sure independent admin routes work', () => {
          this.postRequestWithMissingParameters()
          this.postRequestIndependently()
          this.getRequestIndependently()
          this.getRequestWithWrongID()
          this.putRequestWrongParamaters()
          this.putRequestWithWrongID()
          this.putRequestIndependently()
          this.deleteRequestWrongID()
          this.deleteRequestIndependently()
        })
        resolve()
      })
    } catch (error) {

    }
  }
  postRequestWithMissingParameters () {
    const requestBody = {
      // username: 'MsChnandlerBong',
      password: 'thisisagoodpassword',
      firstName: 'Chandler',
      middleName: 'Muriel',
      lastName: 'Bing',
      DOB: '1961-03-02T21:00:00.000Z',
      gender: 'male',
      nationality: 'Egyptian',
      mobileNumber: 1234567890,
      faxNumber: 9876543210,
      emailAddress: 'hello@world.com',
      address: 'cairo Egypt'
    }

    test(`creating an admin with no username,\t\t[=> POST\t${this.base_url}\t`, async () => {
      const response = await nfetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
    const requestBody1 = {
      username: 'MsChnandlerBong1',
      // password: 'thisisagoodpassword',
      firstName: 'Chandler',
      middleName: 'Muriel',
      lastName: 'Bing',
      DOB: '1961-03-02T21:00:00.000Z',
      gender: 'male',
      nationality: 'Egyptian',
      mobileNumber: 1234567890,
      faxNumber: 9876543210,
      emailAddress: 'hello@world.com',
      address: 'cairo Egypt'
    }

    test(`creating an admin with no password,\t\t[=> POST\t${this.base_url}\t`, async () => {
      const response = await nfetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody1),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
    const requestBody2 = {
      username: 'MsChnandlerBong2',
      password: 'thisisagoodpassword',
      // firstName: 'Chandler',
      middleName: 'Muriel',
      lastName: 'Bing',
      DOB: '1961-03-02T21:00:00.000Z',
      gender: 'male',
      nationality: 'Egyptian',
      mobileNumber: 1234567890,
      faxNumber: 9876543210,
      emailAddress: 'hello@world.com',
      address: 'cairo Egypt'
    }

    test(`creating an admin with no first name,\t\t[=> POST\t${this.base_url}\t`, async () => {
      const response = await nfetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody2),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
    /* const requestBody3 = {
      username: 'MsChnandlerBong3',
      password: 'thisisagoodpassword',
      firstName: 'Chandler',
      // middleName: 'Muriel',
      lastName: 'Bing',
      DOB: '1961-03-02T21:00:00.000Z',
      gender: 'male',
      nationality: 'Egyptian',
      mobileNumber: 1234567890,
      faxNumber: 9876543210,
      emailAddress: 'hello@world.com',
      address: 'cairo Egypt'
    }

    test(`creating an admin with no middle name,\t\t[=> POST\t${this.base_url}\t`, async () => {
      const response = await nfetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody3),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['data'])
    }, 100000) */
    const requestBody4 = {
      username: 'MsChnandlerBong4',
      password: 'thisisagoodpassword',
      firstName: 'Chandler',
      middleName: 'Muriel',
      // lastName: 'Bing',
      DOB: '1961-03-02T21:00:00.000Z',
      gender: 'male',
      nationality: 'Egyptian',
      mobileNumber: 1234567890,
      faxNumber: 9876543210,
      emailAddress: 'hello@world.com',
      address: 'cairo Egypt'
    }

    test(`creating an admin with no last name,\t\t[=> POST\t${this.base_url}\t`, async () => {
      const response = await nfetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody4),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
    const requestBody5 = {
      username: 'MsChnandlerBong5',
      password: 'thisisagoodpassword',
      firstName: 'Chandler',
      middleName: 'Muriel',
      lastName: 'Bing',
      // DOB: '1961-03-02T21:00:00.000Z',
      gender: 'male',
      nationality: 'Egyptian',
      mobileNumber: 1234567890,
      faxNumber: 9876543210,
      emailAddress: 'hello@world.com',
      address: 'cairo Egypt'
    }

    test(`creating an admin with no date of birth,\t\t[=> POST\t${this.base_url}\t`, async () => {
      const response = await nfetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody5),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
    const requestBody6 = {
      username: 'MsChnandlerBong6',
      password: 'thisisagoodpassword',
      firstName: 'Chandler',
      middleName: 'Muriel',
      lastName: 'Bing',
      DOB: '1961-03-02T21:00:00.000Z',
      // gender: 'male',
      nationality: 'Egyptian',
      mobileNumber: 1234567890,
      faxNumber: 9876543210,
      emailAddress: 'hello@world.com',
      address: 'cairo Egypt'
    }

    test(`creating an admin with no gender,\t\t[=> POST\t${this.base_url}\t`, async () => {
      const response = await nfetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody6),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
    const requestBody7 = {
      username: 'MsChnandlerBong7',
      password: 'thisisagoodpassword',
      firstName: 'Chandler',
      middleName: 'Muriel',
      lastName: 'Bing',
      DOB: '1961-03-02T21:00:00.000Z',
      gender: 'male',
      // nationality: 'Egyptian',
      mobileNumber: 1234567890,
      faxNumber: 9876543210,
      emailAddress: 'hello@world.com',
      address: 'cairo Egypt'
    }

    test(`creating an admin with no nationality,\t\t[=> POST\t${this.base_url}\t`, async () => {
      const response = await nfetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody7),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
    const requestBody8 = {
      username: 'MsChnandlerBong8',
      password: 'thisisagoodpassword',
      firstName: 'Chandler',
      middleName: 'Muriel',
      lastName: 'Bing',
      DOB: '1961-03-02T21:00:00.000Z',
      gender: 'male',
      nationality: 'Egyptian',
      // mobileNumber: 1234567890,
      faxNumber: 9876543210,
      emailAddress: 'hello@world.com',
      address: 'cairo Egypt'
    }

    test(`creating an admin with no mobile number,\t\t[=> POST\t${this.base_url}\t`, async () => {
      const response = await nfetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody8),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
    /* const requestBody9 = {
      username: 'MsChnandlerBong',
      password: 'thisisagoodpassword',
      firstName: 'Chandler',
      middleName: 'Muriel',
      lastName: 'Bing',
      DOB: '1961-03-02T21:00:00.000Z',
      gender: 'male',
      nationality: 'Egyptian',
      mobileNumber: 1234567890,
      // faxNumber: 9876543210,
      emailAddress: 'hello@world.com',
      address: 'cairo Egypt'
    }

    test(`creating an admin with no fax number,\t\t[=> POST\t${this.base_url}\t`, async () => {
      const response = await nfetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody9),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).toEqual(['data'])
    }, 100000) */
  }
  postRequestIndependently () {
  
    const requestBody = {
      username: 'MsChnandlerBong8',
      password: 'thisisagoodpassword',
      firstName: 'Chandler',
      middleName: 'Muriel',
      lastName: 'Bing',
      DOB: '1961-03-02T21:00:00.000Z',
      gender: 'male',
      nationality: 'Egyptian',
      mobileNumber: 1234567890,
      faxNumber: 9876543210,
      emailAddress: 'hello@world.com',
      address: 'cairo Egypt'
    }

    test(`creating a new admin,\t\t[=> POST\t${this.base_url}\t`, async () => {
      const response = await nfetch(`${this.base_url}`, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()

      expect(Object.keys(jsonResponse)).not.toEqual(['error'])
      const adminInstance = await Admin.findById(jsonResponse.data._id).exec()
      expect(adminInstance).toMatchObject(requestBody)
      this.sharedState.id = adminInstance._id
      this.sharedState.username = adminInstance.username
      this.sharedState.password = adminInstance.password
      this.sharedState.firstName = adminInstance.firstName
      this.sharedState.middleName = adminInstance.middleName
      this.sharedState.lastName = adminInstance.lastName
      this.sharedState.DOB = adminInstance.DOB
      this.sharedState.gender = adminInstance.gender
      this.sharedState.nationality = adminInstance.nationality
      this.sharedState.mobileNumber = adminInstance.mobileNumber
      this.sharedState.faxNumber = adminInstance.faxNumber
      this.sharedState.emailAddress = adminInstance.emailAddress
      this.sharedState.address = adminInstance.address
    }, 100000)
  }
  getRequestIndependently () {
    test(`getting the admin,\t[=> GET\t\t${this.base_url}/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['data'])

      expect(jsonResponse.data.username).toEqual(this.sharedState.username)
      expect(jsonResponse.data.password).toEqual(this.sharedState.password)
      expect(jsonResponse.data.firstName).toEqual(this.sharedState.firstName)
      expect(jsonResponse.data.middleName).toEqual(this.sharedState.middleName)
      expect(jsonResponse.data.lastName).toEqual(this.sharedState.lastName)
      expect(jsonResponse.data.DOB).toEqual(this.sharedState.DOB)
      expect(jsonResponse.data.gender).toEqual(this.sharedState.gender)
      expect(jsonResponse.data.nationality).toEqual(this.sharedState.nationality)
      expect(jsonResponse.data.mobileNumber).toEqual(this.sharedState.mobileNumber)
      expect(jsonResponse.data.faxNumber).toEqual(this.sharedState.faxNumber)
      expect(jsonResponse.data.emailAddress).toEqual(this.sharedState.emailAddress)
      expect(jsonResponse.data.address).toEqual(this.sharedState.address)
    }, 100000)
  }
  getRequestWithWrongID () {
    test(`getting unexisting admin,\t[=> GET\t\t${this.base_url}/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/13213`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
  }
  putRequestWrongParamaters () {
    const requestBody = {
      username: 11
    }
    test(`Updating admin data with wrong username type,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      }, 100000)
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
    const requestBody1 = {
      password: 11
    }
    test(`Updating admin data with wrong password type,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody1),
        headers: { 'Content-Type': 'application/json' }
      }, 100000)
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
    const requestBody2 = {
      firstName: 11
    }
    test(`Updating admin data with wrong first name type,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody2),
        headers: { 'Content-Type': 'application/json' }
      }, 100000)
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
    const requestBody3 = {
      middleName: 11
    }
    test(`Updating admin data with wrong middle name type,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody3),
        headers: { 'Content-Type': 'application/json' }
      }, 100000)
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
    const requestBody4 = {
      lastName: 11
    }
    test(`Updating admin data with wrong last name type,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody4),
        headers: { 'Content-Type': 'application/json' }
      }, 100000)
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
    /* const requestBody5 = {
      DOB: 11
    }
    test(`Updating admin data with wrong date of birth type,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody5),
        headers: { 'Content-Type': 'application/json' }
      }, 100000)
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000) */
    const requestBody6 = {
      gender: 11
    } 
    test(`Updating admin data with wrong gender type,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody6),
        headers: { 'Content-Type': 'application/json' }
      }, 100000)
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
    const requestBody7 = {
      nationality: 11
    }
    test(`Updating admin data with wrong nationality type,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody7),
        headers: { 'Content-Type': 'application/json' }
      }, 100000)
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
    const requestBody8 = {
      mobileNumber: 'not even in your wildest dreams'
    }
    test(`Updating admin data with wrong mobile number type,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody8),
        headers: { 'Content-Type': 'application/json' }
      }, 100000)
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
    const requestBody9 = {
      faxNumber: 'do people still even use those'
    }
    test(`Updating admin data with wrong fax number type,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody9),
        headers: { 'Content-Type': 'application/json' }
      }, 100000)
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
    const requestBody10 = {
      emailAddress: 11
    }
    test(`Updating admin data with wrong email address type,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody10),
        headers: { 'Content-Type': 'application/json' }
      }, 100000)
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
    const requestBody11 = {
      address: 11
    }
    test(`Updating admin data with wrong address type,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody11),
        headers: { 'Content-Type': 'application/json' }
      }, 100000)
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
  }
  putRequestWithWrongID () {
    const requestBody = {
      firstName: 'Sandler'
    }

    test(`Updating the data of an unexistent admin,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/80085`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      }, 100000)
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
    }, 100000)
  }
  putRequestIndependently () {
    const requestBody = {
      username: 'MsSnandlerBong8',
      password: 'thisisabadpassword',
      firstName: 'Sandler',
      middleName: 'Ariel',
      lastName: 'Bong',
      DOB: '1961-04-02T21:00:00.000Z',
      gender: 'female',
      nationality: 'American',
      mobileNumber: 9876543210,
      faxNumber: 1234567890,
      emailAddress: 'Welcome@host.com',
      address: 'Nevada USA'
    }

    test(`Updating the data of the created admin,\t[=> PUT\t\t${this.base_url}/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'PUT',
        body: JSON.stringify(requestBody),
        headers: { 'Content-Type': 'application/json' }
      })
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).not.toEqual(['error'])

      const adminInstance = await Admin.findById(this.sharedState.id).exec()
      expect(adminInstance).toMatchObject(requestBody)
      this.sharedState.username = adminInstance.username
      this.sharedState.password = adminInstance.password
      this.sharedState.firstName = adminInstance.firstName
      this.sharedState.middleName = adminInstance.middleName
      this.sharedState.lastName = adminInstance.lastName
      this.sharedState.DOB = adminInstance.DOB
      this.sharedState.gender = adminInstance.gender
      this.sharedState.nationality = adminInstance.nationality
      this.sharedState.mobileNumber = adminInstance.mobileNumber
      this.sharedState.faxNumber = adminInstance.faxNumber
      this.sharedState.emailAddress = adminInstance.emailAddress
      this.sharedState.address = adminInstance.address
    }, 100000)
  }
  deleteRequestWrongID () {
    test(`Deleting unexistent admin,\t\t\t[=> DELETE\t${this.base_url}/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/50000`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      }, 100000)
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).toEqual(['error'])
      const adminInstance = await Admin.findOne({ _id: this.sharedState.id }).exec()
      expect(adminInstance).not.toEqual(null)
    })
  }
  deleteRequestIndependently () {
    test(`Deleting that admin,\t\t\t[=> DELETE\t${this.base_url}/:id\t`, async () => {
      const response = await nfetch(`${this.base_url}/${this.sharedState.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      }, 100000)
      const jsonResponse = await response.json()
      expect(Object.keys(jsonResponse)).not.toEqual(['error'])
      const adminInstance = await Admin.findOne({ _id: this.sharedState.id }).exec()
      expect(adminInstance).toEqual(null)
    })
  }
}
module.exports = AdminsTest
