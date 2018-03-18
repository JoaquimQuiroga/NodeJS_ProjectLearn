//const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

let obj = new ObjectID();
console.log(obj)


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Error open connecting to mongodb on local')
  }
  console.log('Connected to MongoDB server')
  const db = client.db('TodoApp')

  db.collection('Users').insertOne({
    name: 'Joaquim',
    age: 28,
    location: 'Chile'
  }, (err, result) => {
    if (err) {
      return console.log('Error inserting data to Todos collection')
    }
    console.log('Inserted inside Todos collection')
    console.log(JSON.stringify(result.ops, undefined, 2))
    console.log(result.ops[0]._id.getTimestamp())
  })

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Error inserting data to Todos collection')
  //   }
  //   console.log('Inserted inside Todos collection')
  //   console.log(JSON.stringify(result.ops, undefined, 2))
  //
  // })

  client.close()
})


