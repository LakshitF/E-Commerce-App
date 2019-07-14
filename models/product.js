const mongodb=require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let slug = require("mongoose-slug-generator");

const productSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  slug: {
    type: String,
    slug: "title",
    unique: true
  },
},{collection:'products'});

module.exports = mongoose.model('Product', productSchema);
