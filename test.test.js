const mongoose = require('mongoose')
const db = require('./config/keys.js').mongoURI
const externalEntityTest = require('./tests/externalEntity')
mongoose.connect(db).then(() => console.log('Connected to Database')).catch(err => console.log(err))
const externalEntitys = new externalEntityTest(3000, 'admin')
Promise.all([externalEntitys.runIndependently()]).then(result => {})