let mongoose = require('mongoose')

mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost:27017/TodoApp')
mongoose.connect('mongodb://djo:1qsefth@ds117759.mlab.com:17759/node_playground')

module.exports = {mongoose}