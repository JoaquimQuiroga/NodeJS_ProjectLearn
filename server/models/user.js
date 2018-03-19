let mongoose = require('mongoose')

let User = mongoose.model('User', {
  username: {
    type: String,
    required: true,
    minlengthValidator: 1,
    trim: true
  },
  email: {
    type: String,
    required: true,
    minlengthValidator: 1,
    trim: true
  },
  registerAt: {
    type: Number,
    default: Math.floor(Date.now() / 1000)
  }
})

module.exports = {User}
