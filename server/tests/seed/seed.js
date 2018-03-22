const jwt = require('jsonwebtoken')

const {ObjectID} = require('mongodb')

const {Todo} = require('./../../models/todo')

const {User} = require('./../../models/user')

const userOneId = new ObjectID()
const userTwoId = new ObjectID()
const users = [{
  _id: userOneId,
  email: 'joaquim.quiroga@phineal.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'joaquim.quiroga2@phineal.com',
  password: 'userTwoPass',
}]

let dummyTodo = [{
  _id: new ObjectID(),
  text: 'First test todo',
  _creator:userOneId
}, {
  _id: new ObjectID(),
  text: 'Second test todo',
  _creator:userTwoId
}]

const populatedummyTodo = (done) => {
  Todo.remove({}).then(() => {
    console.log('HERE2.5')
    return Todo.insertMany(dummyTodo)
    console.log('HERE3')
  }).then(() => {
    console.log('HERE4')
    done()
  })
}

const populateUsers = (done) => {
  User.remove({}).then(() => {
    let userOne = new User(users[0]).save()
    let userTwo = new User(users[1]).save()
    console.log('HERE')
    return Promise.all([userOne,userTwo])
  }).then(() => {
    console.log('HERE2')
    done()
  })
}

module.exports = {dummyTodo, populatedummyTodo, users, populateUsers}