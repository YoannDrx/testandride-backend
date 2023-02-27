const mongoose = require("mongoose");


const roleSchema = mongoose.Schema({
  name: String,
  isAdmin:Boolean,
  isTesteur:Boolean,
  isSupport:Boolean,
  created:{type:Date,default:new Date()},
  lastModified:{type:Date,default:new Date()},
  author:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  lastModifier:{type: mongoose.Schema.Types.ObjectId, ref: 'users'}, 

});
const Role = mongoose.model("roles", roleSchema);
module.exports = Role;
