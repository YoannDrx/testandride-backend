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
  rdv_id:{type: mongoose.Schema.Types.ObjectId, ref: 'meetings'},
  role_id:{type: mongoose.Schema.Types.ObjectId, ref: 'roles'},
  googleId:String,
});
const User = mongoose.model("users", userSchema);
module.exports = User;
