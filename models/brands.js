const mongoose = require("mongoose");


const brandSchema = mongoose.Schema({
  name: String,
  isAdmin:Boolean,
  isTesteur:Boolean,
  isSupport:Boolean,
  created:{type:Date,default:new Date()},
  lastModified:{type:Date,default:new Date()},
  author:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  lastModifier:{type: mongoose.Schema.Types.ObjectId, ref: 'users'}, 

});
const Brand = mongoose.model("brands", brandSchema);
module.exports = Brand;
