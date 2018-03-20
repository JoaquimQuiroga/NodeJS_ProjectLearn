let mongoose = require('mongoose')

mongoose.Promise = global.Promise
/*
try{
  let mongoDB =
}catch {
  let mongoDB =

}
*/
let mongodbURL = process.env.MONGODB_URL || 'mongodb://djo:1qsefth@ds117759.mlab.com:17759/node_playground'
console.log(mongodbURL)
mongoose.connect(mongodbURL)
// mongoose.connect('mongodb://localhost:27017/TodoApp')
//mongoose.connect('mongodb://djo:1qsefth@ds117759.mlab.com:17759/node_playground')

module.exports = {mongoose}