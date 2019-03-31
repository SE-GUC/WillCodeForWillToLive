const mongoose = require('mongoose')
const db = require('./config/keys.js').mongoURI
const AdminsTest = require('./tests/admin')
mongoose.connect(db).then(() => console.log('Connected to Database')).catch(err => console.log(err))
const admins = new AdminsTest(3000, 'admin')
Promise.all([admins.runIndependently()]).then(result => {})
