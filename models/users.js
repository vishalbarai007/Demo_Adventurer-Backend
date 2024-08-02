var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {type: String, unique:true},
  password : String,
}, {timestamps: true});

console.log("DB connected");

mongoose.model('User', UserSchema);