
const functions = {
    sortTaskById : async () => {
        console.log("Entered sortID func")
        const Task = require('./models/Task')
        var Tasks = await Task.find()
        for(var i = Task.length - 1; i >= 0; i--){
            var maxTask = Tasks[0]
            var ind = 0
            for(var j = 1; j<=i ; j++){
                var currentTask = Tasks[j] 
                if(currentTask.id > maxTask.id){
                    maskTask = currentTask
                    ind = j
                }
            }
            var temp = Tasks[i];
            Tasks[i] = maxTask
            Tasks[ind] = temp
        }
        return Tasks
    },

    sortTaskByCreationDate : async () => {
        console.log("Entered sortCD func")
        const Task = require('./models/Task')
        const Tasks = await Task.find()
        for(var i = Task.length - 1; i >= 0; i--){
            var maxTask = Tasks[0]
            var ind = 0
            for(var j = 1; j<=i ; j++){
                var currentTask = Tasks[j] 
                if(currentTask.created_at > maxTask.created_at){
                    maskTask = currentTask
                    ind = j
                }
            }
            var temp = Tasks[i]
            Tasks[i] = maxTask
            Tasks[ind] = temp
        }
        return Tasks
    }

   /*createReviewer : async (req) => {
        try{
        console.log({data: req})
        const validator = require('./validations/reviewerValidations')
        const Reviewer = require('./models/Reviewer')
        const isValidated = validator.createValidation(req)
        if(isValidated.error) return res.status(404).send({error: isValidated.error.details[0].message})
        const newReviewer = await Reviewer.create(req)
        var msg = 'Reviewer created successfully'
        return msg
        }
        catch(error){
            return 'Error in reviewer creation'
        }
    }*/
}
module.exports = functions