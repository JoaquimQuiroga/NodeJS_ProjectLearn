let express = require('express')
let bodyParser = require('body-parser')

let {mongoose} = require('./db/mongoose')
let {Todo} = require('./models/todo')
let {User} = require('./models/user')

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

app.listen(3000, () => {
  console.log('Started on port 3000')
})

module.exports = {app}