const mongoose = require('mongoose')
const TasksTest = require("./tests/task")
const ReviewerTest = require("./tests/reviewer")
const db = require('./config/keys').mongoURI


mongoose
    .connect(db)
    .then(() => console.log('Connected to Database'))
    .catch(err => console.log(err))

const task = new TasksTest(3000,'task')
const reviewer = new ReviewerTest(3000,'reviewer')

Promise.all([task.runIndependently()]).then(result => {})
Promise.all([reviewer.runIndependently()]).then(result => {})

