const mongoose = require("mongoose");

telSchema = mongoose.Schema({
    title:String,
    num:String,
})
const userSchema = mongoose.Schema({
  email: String,
  password: String,
  token: String,
  firstName: String,
  lastName: String,
  tels:[telSchema],
  avatar:String,
  role_id:{type: mongoose.Schema.Types.ObjectId, ref: 'roles'},
  googleId:String,
  created:{type:Date,default:new Date()},
  lastModified:{type:Date,default:new Date()},
  author:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  lastModifier:{type: mongoose.Schema.Types.ObjectId, ref: 'users'}, 

});
const User = mongoose.model("users", userSchema);
module.exports = User;
