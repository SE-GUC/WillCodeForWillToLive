//const uuid = require('uuid')

/*class Task{
    constructor(priority, description, created_at, isDone){
        this.ID = uuid.v4();
        this.priority = priority;
        this.description = description;
        this.created_at = created_at;
        this.isDone = isDone;
    } 
}*/

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    priority: {
        type : String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    created_at: {
        type: String,
        required: true
    },

    isDone: {
        type: Boolean,
        required: true
    }
})

//module.exports = Task
module.exports = Task = mongoose.model('task', TaskSchema)