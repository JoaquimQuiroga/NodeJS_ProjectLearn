let env = process.env.NODE_ENV || 'development' // on heroku
//console.log('env ********* ', env)

if (env === 'development') {
  process.env.PORT = 3000
  process.env.MONGODB_URL = 'mongodb://localhost:27017/TodoApp'
} else if (env === 'test') {
  console.log('env test')
  process.env.PORT = 3000
  process.env.MONGODB_URL = 'mongodb://localhost:27017/TodoAppTest'

}
