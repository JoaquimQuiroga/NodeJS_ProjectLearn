//const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Error open connecting to mongodb on local')
  }
  console.log('Connected to MongoDB server')
  const db = client.db('TodoApp')

  // db.collection('Todos').find({
  //   completed: false
  // }).toArray().then((docs) => {
  //   console.log('Todos')
  //   console.log(JSON.stringify(docs, undefined, 2))
  // }, (err) => {
  //   console.log('Unable to fetch todos ', err)
  // })

  db.collection('Users').find({
    name:'Joaquim'
  }).count().then((count) => {
    console.log('Todos count')
    console.log(count)
  }, (err) => {
    console.log('Unable to fetch todos ', err)
  })

  client.close()
})


