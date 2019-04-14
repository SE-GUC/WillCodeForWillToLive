const mongoose = require('mongoose')

const schema = {
  fields: {type: [{
      name: {type: String, required: true},
      value: {type: String, required: true}
    }],
    required: true
  },
  userId: {type: String, required: true}
}

module.exports = mongoose.model('Form', schema)
