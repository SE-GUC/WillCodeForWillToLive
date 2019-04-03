const mongoose = require('mongoose')
const db = require('./config/keys.js').mongoURI
const AdminsTest = require('./tests/admin')
const ReviewerTest = require("./tests/reviewer")
const casesTest = require('./tests/case')
const lawyerTest = require('./tests/lawyer')
const TasksTest = require("./tests/task")
const externalEntityTest = require('./tests/externalEntity')
const investorTest = require('./tests/investor')
<<<<<<< HEAD
const FormTest = require('./tests/form')
=======
>>>>>>> origin/Dev

mongoose.connect(db).then(() => console.log('Connected to Database')).catch(err => console.log(err))
const admins = new AdminsTest(3000, 'admin')
const task = new TasksTest(3000,'task')
const reviewer = new ReviewerTest(3000,'reviewer')
const cases = new casesTest(3000,'cases')
const lawyer = new lawyerTest(3000,'lawyer')
const investor = new investorTest(3000,'investor')
const externalEntity = new externalEntityTest(3000,'externalEntitys')
<<<<<<< HEAD
const form = new FormTest(3000, 'form')
=======
>>>>>>> origin/Dev

Promise.all([admins.runIndependently()]).then(result => {})
Promise.all([cases.runIndependently()]).then(result => {})
Promise.all([task.runIndependently()]).then(result => {})
Promise.all([reviewer.runIndependently()]).then(result => {})
Promise.all([lawyer.runIndependently()]).then(result => {})
Promise.all([investor.runIndependently()]).then(result => {})
Promise.all([externalEntity.runIndependently()]).then(result => {})
<<<<<<< HEAD
Promise.all([form.runIndependently()]).then(result => {})
=======
>>>>>>> origin/Dev
