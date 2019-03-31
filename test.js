const mongoose = require('mongoose')
const TasksTest = require("./tests/task")
const db = require('./config/keys').mongoURI


mongoose
    .connect(db)
    .then(() => console.log('Connected to Database'))
    .catch(err => console.log(err))

const task = new TasksTest(3000,'task')

Promise.all([task.runIndependently()]).then(result => {})

