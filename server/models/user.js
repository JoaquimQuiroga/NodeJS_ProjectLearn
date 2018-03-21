const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

var UserSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    unique: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }],
  registerAt: {
    type: Number,
    default: Math.floor(Date.now() / 1000)
  }
})

UserSchema.methods.toJSON = function () {
  let user = this
  let userObject = user.toObject()

  return _.pick(userObject, ['_id', 'email'])
}

UserSchema.methods.generateAuthToken = function () {
  let user = this
  let access = 'auth'
  let token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString()

  user.tokens = user.tokens.concat([{access, token}])
  //user.tokens.push({access,token})
  return user.save().then(() => {
    return token
  })
}

UserSchema.statics.findByToken = function (token) {
  let User = this
  let decoded
  try {
    decoded = jwt.verify(token, 'abc123')
  } catch (e) {
    return new Promise((resolve, reject) => {
      reject()
    })
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })

}

let User = mongoose.model('User', UserSchema)

module.exports = {User}
