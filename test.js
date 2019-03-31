const mongoose = require('mongoose')
const db = require('./config/keys.js').mongoURI
const AdminsTest = require('./tests/admin')
const reviewersTest = require('./tests/reviewer')
const casesTest = require('./tests/case')
const lawyerTest = require('./tests/lawyer')

mongoose.connect(db).then(() => console.log('Connected to Database')).catch(err => console.log(err))
const admins = new AdminsTest(3000, 'admin')
const reviewer = new reviewersTest(3000,'reviewer')
const cases = new casesTest(3000,'cases')
const lawyer = new lawyerTest(3000,'lawyer')

Promise.all([admins.runIndependently()]).then(result => {})
Promise.all([cases.runIndependently()]).then(result => {})
Promise.all([reviewer.runIndependently()]).then(result => {})
Promise.all([lawyer.runIndependently()]).then(result => {})
