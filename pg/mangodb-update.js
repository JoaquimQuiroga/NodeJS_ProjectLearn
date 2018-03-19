//const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Error open connecting to mongodb on local')
  }
  console.log('Connected to MongoDB server')
  const db = client.db('TodoApp')

  db.collection('Todos').findOneAndUpdate({
      text: 'Eat lunch'
    }, {
      $set: {
        completed: true
      }
    }, {
      returnOriginal: false
    }).then((result) => {
    console.log(result)
  })

  client.close()
})


