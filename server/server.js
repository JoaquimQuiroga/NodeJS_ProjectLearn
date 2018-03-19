const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} = require('mongodb')

const {mongoose} = require('./db/mongoose')
const {Todo} = require('./models/todo')
const {User} = require('./models/user')

let app = express()

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
  res.send(req.params);
  let id = req.params.id
  if (!ObjectID.isValid(id)) {
    console.log('Id not valid')
    res.status(404).send()
  }
  Todo.findById(id).then((todo) => {
    if (!todo) {
      console.log('Id of Todo not found')
      res.status(404).send()
    }
    console.log('todo by Id ', todo)
    res.status(200).send(todo)
  }).catch((e) => res.status(400).send())
})

app.listen(3000, () => {
  console.log('Started on port 3000')
})

module.exports = {app}