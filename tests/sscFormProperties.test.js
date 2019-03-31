const dbURI = require('../config/keys').mongoURI
const Model = require('../models/SscFormProperties')
const mongoose = require('mongoose')
let fetch = require('node-fetch')
//fetch.defaults.adapter = require('fetch/lib/adapters/http')

jest.setTimeout(100000)

beforeAll(async () => {
  await mongoose.connect(dbURI, {useNewUrlParser: true})
})

afterAll(async() => {
  await mongoose.connection.dropDatabase()
  await mongoose.disconnect()
})

beforeEach( async () => {
  await mongoose.connection.dropDatabase()
})


test('Test get request from the router', async () => {
  return fetch('http://localhost:3000/api/sscFormProps', {
    method: 'GET'
  }).then(async res =>{
    const data = await res.json()
    const dataFromDb = await Model.find()
    const propsFromDb = JSON.parse(JSON.stringify(dataFromDb[0]))
    expect(dataFromDb.length).toBe(1)
    expect(data).toEqual(propsFromDb)
  })
})

test('Test changing the minimum capital', async () => {
  return fetch ('http://localhost:3000/api/sscFormProps', {
    method: 'PUT',
    body: JSON.stringify({minimumCapital: 70000}),
    headers: {'Content-Type': 'application/json; charset=UTF-8'}
  })
  .then(async _ => {
    const dataFromDb = await Model.find()
    const minimumCapital = dataFromDb[0].minimumCapital
    expect(dataFromDb.length).toBe(1)
    expect(minimumCapital).toBe(70000)
  })
})