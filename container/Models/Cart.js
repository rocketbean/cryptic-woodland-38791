
  const mongoose = require("mongoose")
  const __v = require("validator")
  const guarded = [];

  let CartSchema = new mongoose.Schema({
    /* *
    * Model Data Structure
    * */
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      unique: true,
      required: true
    },
    status: {
      type: Number,
      default: 0
    }
  }, {
    timestamps: true,
  })
  const newLocal = '_id'

  CartSchema.virtual('items', {
    ref: 'cartitem',
    localField: newLocal,
    foreignField: 'cart'
  })
  
  CartSchema.methods.toJSON = function() {
      let newProp = {};
      let cart = this.toObject()
      guarded.map(prop => {
        delete cart[prop]
      })
      Object.keys(cart).map(prop => {
        if(!(guarded.includes(prop))) {
          newProp[prop] = cart[prop]
        }
      })
      return newProp;
  }
  
  const Cart = mongoose.model('cart', CartSchema)
  module.exports = Cart