var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: String,
  password : String,
}, {timestamps: true});

console.log("DB connected");

mongoose.model('User', UserSchema);