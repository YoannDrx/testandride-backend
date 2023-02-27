const mongoose = require("mongoose");

const telSchema = mongoose.Schema({
    title:String,
    num:String,
});

const emailSchema = mongoose.Schema({
    title:String,
    email:String,
});
const coordSchema = mongoose.Schema({
    lat:Number,
    lon:Number,
});

const adressSchema = mongoose.Schema({
    title:String,
    adresse:String,
    postalCode: String,
    city:String,
    coords:coordSchema,
    comment:String,
})

const customerSchema = mongoose.Schema({
    lastName:String,
    firstName:String,
    tels:[telSchema],
    emails:[emailSchema],
    adresses:[adressSchema],
    created:{type:Date,default:new Date()},
    lastModified:{type:Date,default:new Date()},
    author:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    lastModifier:{type: mongoose.Schema.Types.ObjectId, ref: 'users'}, 
});
const Customer = mongoose.model("customers", customerSchema);
module.exports = Customer;