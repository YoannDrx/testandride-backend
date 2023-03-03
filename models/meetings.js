const mongoose = require("mongoose");

const coordSchema = mongoose.Schema({
    lat:Number,
    lon:Number,
});

const adressSchema = mongoose.Schema({
    adresse:String,
    postalCode:String,
    city:String,
    coords:coordSchema,
    comment:String,
});



const meetingSchema = mongoose.Schema({
    user_id:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    startedDate:Date,
    endedDate:Date,
    adresse:adressSchema,
    status:String,
    isConversion:Boolean,
    product_id:{type: mongoose.Schema.Types.ObjectId, ref: 'products'},
    feedback_id:{type: mongoose.Schema.Types.ObjectId, ref: 'feedbacks'},
    customer_id:{type: mongoose.Schema.Types.ObjectId, ref: 'customers'},
    warehouse_id:{type: mongoose.Schema.Types.ObjectId, ref: 'warehouses'},
    type:String,
    date:Date,
    codeRDV:String,
    googleCalendarId:String,
    googleEventId:String,
    created:{type:Date,default:new Date()},
    lastModified:{type:Date,default:new Date()},
    author:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    lastModifier:{type: mongoose.Schema.Types.ObjectId, ref: 'users'}, 
});
const Meeting = mongoose.model("meetings", meetingSchema);
module.exports = Meeting;