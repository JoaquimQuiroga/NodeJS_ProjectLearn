let mongoose = require('mongoose')

let Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlengthValidator: 1,
    trim: true,

  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
})

module.exports = {Todo}

//let newUser = new User({
//   username: 'Djo',
//   email: 'joaquim.quiroga@gmail.com'
// })
//
// newUser.save().then((doc) => {
//   console.log('New user :')
//   console.log(JSON.stringify(doc, undefined, 2))
// }, (e) => {
//   console.log(e)
// })