const mongodb=require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart:{
      items:[
        {
        prodid: {type:Schema.Types.ObjectId,ref:'Product',required:true},
        quantity: {type:Number,required:true}
      }
    ]
  },
resetToken:{
  type:String
}
},{collection:'users'});
//defining methods of this schema as we did to that of a class
userSchema.methods.addToCart = function(product) {

  const cartProductIndex = this.cart.items.findIndex(cp => {
    return cp.prodid.toString() === product._id.toString();
  });
  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];  //spread op, useful in copying ops

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].quantity + 1;
    updatedCartItems[cartProductIndex].quantity = newQuantity;
  } else {
    updatedCartItems.push({
      prodid: product._id,
      quantity: newQuantity
    });
  }
  console.log('Updated cart items');
  this.cart={items:updatedCartItems};
  console.log(this.cart);
  return this.save();
};

userSchema.methods.removeFromCart = function(productId) {
  console.log('In remove cart function');
  console.log(productId);

  let updatedCartItems = this.cart.items.filter(item => {
    console.log(item.prodid);
    return item.prodid.toString() !== productId;  //filter takes this elem in the new array if inside condition is true
  });
  this.cart.items = updatedCartItems;
  console.log(this.cart.items);
  console.log("removed");
  return this.save();
};

userSchema.methods.clearCart = function() {
  this.cart = { items: [] };
  return this.save();
};
module.exports = mongoose.model('User', userSchema);
