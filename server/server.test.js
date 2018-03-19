const expect = require('expect')
const request = require('supertest')
const {ObjectID} = require('mongodb')

const {app} = require('./server')
const {Todo} = require('./models/todo')

let dummyTodo = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo'
}]

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(dummyTodo)
  }).then(() => done())
})

describe('POST /todos', () => {

  it('Should create a new todo', (done) => {
    let text = 'text to create new todo'

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1)
          expect(todos[0].text).toBe(text)
          done()
        }).catch((e) => done(e))
      })

  })

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2)
          done()
        }).catch((e) => done(e))

      })

  })
})

describe('GET /todos', () => {

  it('Should get all in todo collection', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2)
      })
      .end(done)
  })

})

describe('GET /todos/:id', () => {

  it('Should get the doc with ID', (done) => {
    request(app)
      .get(`/todos/${dummyTodo[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(dummyTodo[0].text)
      })
      .end(done)
  })
  it('shoudl return 404 with invalid ID objet', (done) => {
    request(app)
      .get(`/todos/12356sdada`)
      .expect(404)
    done()
  })
  it('shoudl return 404 with valid ID objet but no match', (done) => {
    request(app)
      .get(`/todos/5aafd75d7891252838b37734`)
      .expect(404)
    done()
  })
})