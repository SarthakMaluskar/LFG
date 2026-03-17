const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,

  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  favouriteGame : [{
    type : String
  }]
});

module.exports= mongoose.model('User', userSchema);