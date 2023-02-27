const mongoose = require("mongoose");


const feedbackSchema = mongoose.Schema({
  responses: String,
  created:{type:Date,default:new Date()},
  lastModified:{type:Date,default:new Date()},
  author:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  lastModifier:{type: mongoose.Schema.Types.ObjectId, ref: 'users'}, 

});
const Feedback = mongoose.model("feedbacks", feedbackSchema);
module.exports = Feedback;
