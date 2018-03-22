require('./config/config')

const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')
const {authenticate} = require('./middleware/authenticate')

let app = express()
//const port = process.env.PORT || 3000

app.use(bodyParser.json())

//access structure db
app.post('/todos', (req, res) => {
  //console.log(JSON.stringify(req.body.text,undefined,2))
  let todo = new Todo({
    text: req.body.text
  })

  //saving
  todo.save().then((doc) => {
    res.send(doc)
    //console.log(`Saved : ${JSON.stringify(doc, undefined, 2)}`)
  }, (e) => {
    res.status(400).send(e)
    //console.log(`Error: ${e}`)
  })

})

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos: todos
    })
  }, (e) => {
    res.status(400).send(e)
  })
})

app.get('/todos/:id', (req, res) => {
  //res.send(req.params);
  let id = req.params.id
  if (!ObjectID.isValid(id)) {
    // console.log('Id not valid')
    res.status(404).send()
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      //console.log('Id of Todo not found')
      res.status(404).send()
    }
    //console.log('todo by Id ', todo)
    res.send({todo})
  }).catch((e) => res.status(400).send())
})

app.delete('/todos/:id', (req, res) => {
  let id = req.params.id
  if (!ObjectID.isValid(id)) {
    // console.log('Id not valid')
    res.status(404).send()
  }
  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      //console.log('Id of Todo not found')
      res.status(404).send()
    }
    //console.log('todo by Id ', todo)
    res.send({todo})
  }).catch((e) => res.status(400).send())
})

app.patch('/todos/:id', (req, res) => {
  let id = req.params.id
  if (!ObjectID.isValid(id)) {
    res.status(404).send()
  }
  let body = _.pick(req.body, ['text', 'completed'])

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime()
  } else {
    body.completed = false
    body.completedAt = null
  }
  Todo.findByIdAndUpdate(id, {
    $set: body,
  }, {
    new: true
  }).then((todo) => {
    if (!todo) {
      res.status(404).send()
    }
    res.send({todo})
  }).catch((e) => {
    res.status(400).send()
  })
})

// POST /users
app.post('/users', (req, res) => {
  //console.log(JSON.stringify(req.body.text,undefined,2))
  let body = _.pick(req.body, ['email', 'password'])
  let user = new User(body)
  //saving
  user.save().then(() => {
    return user.generateAuthToken()
    //console.log(`Saved : ${JSON.stringify(doc, undefined, 2)}`)
  }).then((token) => {
    res.header('x-auth', token).send(user)
  }).catch((e) => {
    res.status(400).send(e)
  })
})

//GET users
app.get('/users', (req, res) => {
  User.find().then((users) => {
    res.send({
      users: users
    })
  }, (e) => {
    res.status(400).send(e)
  })
})

app.get('/user/me', authenticate, (req, res) => {
  res.send(req.user)
})

// POST /user/login {login, password}
app.post('/user/login', (req, res) => {
  let body = _.pick(req.body, ['email', 'password'])

  User.findByCredentials(body.email, body.password).then((user) => {
    user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user)
    })
  }).catch((e) => {
    res.status(400).send()
  })

})

app.delete('/user/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send()
  }, () => {
    res.status(400).send()
  })
})

app.listen(process.env.PORT, () => {
  console.log('Started on port ', process.env.PORT)
})

module.exports = {app}