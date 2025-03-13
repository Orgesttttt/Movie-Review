const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect('mongodb://127.0.0.1:27017/movie-manager')
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => 
  console.log(error)
)
module.exports = mongoose