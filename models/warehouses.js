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


const warehouseSchema = mongoose.Schema({
  title: String,
  adresse:adressSchema,
  created:{type:Date,default:new Date()},
  lastModified:{type:Date,default:new Date()},
  author:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
  lastModifier:{type: mongoose.Schema.Types.ObjectId, ref: 'users'}, 

});
const Warehouse = mongoose.model("warehouses", warehouseSchema);
module.exports = Warehouse;
