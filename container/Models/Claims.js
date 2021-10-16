
  const mongoose = require("mongoose")
  const __v = require("validator")
  
  let ClaimsSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
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
    }
  }, {
    timestamps: true,
  })
  
  ClaimsSchema.methods.toJSON = function () {
    const Claims = this
    const ClaimsObject = Claims.toObject()

    return ClaimsObject;
  }
  
  
  const Claims = mongoose.model('claims', ClaimsSchema)
  module.exports = Claims