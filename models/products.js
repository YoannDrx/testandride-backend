const mongoose = require("mongoose");

const priceSchema = mongoose.Schema({
       deviseCode:String,
       price:Number, 
       date:{type:Date, default:new Date()},
})

const productSchema = mongoose.Schema({
    model: String,
    brand_id:{type: mongoose.Schema.Types.ObjectId, ref: 'brands'},
    descriptionText:String,
    descriptionFile:String,
    picture:String,
    prices:[priceSchema],
    created:{type:Date,default:new Date()},
    lastModified:{type:Date,default:new Date()},
    author:{type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    lastModifier:{type: mongoose.Schema.Types.ObjectId, ref: 'users'}, 
});

const Product = mongoose.model("products", productSchema);
module.exports = Product;
