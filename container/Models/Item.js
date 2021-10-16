
  const mongoose = require("mongoose")
  const __v = require("validator")
  
  let ItemSchema = new mongoose.Schema({
    /* *
    * Model Data Structure
    * */
    name: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      trim: true
    },
    imageUrl: {
      type: String,
      trim: true
    },
    attachments: {
      type: {},
      default: []
    },
    stock: {
      type: Number,
      min: 0,
      default: 50
    },
  }, {
    timestamps: true,
  })
  
  ItemSchema.methods.toJSON = function () {
    const Item = this
    const ItemObject = Item.toObject()
    return ItemObject;
  }
  
  
  const Item = mongoose.model('item', ItemSchema)
  module.exports = Item