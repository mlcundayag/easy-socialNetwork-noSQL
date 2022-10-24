//import mongoose
const mongoose = require('mongoose')

//connect mongoose and create db on mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//export connection
module.exports = mongoose.connection
