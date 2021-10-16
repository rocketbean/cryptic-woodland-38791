
  const mongoose = require("mongoose")
  const __v = require("validator")

  let CartItemSchema = new mongoose.Schema({
    /* *
    * Model Data Structure
    * */
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'cart',
      required: true
    },
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'item',
      required: true
    },
    qty: {
      type: Number,
      default: 0
    },
  }, {
    timestamps: true,
  })


  
  CartItemSchema.methods.toJSON = function () {
    const CartItem = this
    const CartItemObject = CartItem.toObject()

    return CartItemObject;
  }
  
  
  const CartItem = mongoose.model('cartitem', CartItemSchema)
  module.exports = CartItem