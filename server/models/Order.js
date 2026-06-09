const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

  items: [
    {
      name: String,
      price: Number,
      quantity: Number
    }
  ],

  totalPrice: {
    type: Number,
    required: true
  },

  currentStatus: {
    type: String,
    enum: [
      'pending',
      'confirmed',
      'preparing',
      'out_for_delivery',
      'delivered'
    ],
    default: 'pending'
  },

  statusHistory: [
    {
      status: String,

      updatedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
  

  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurant'
  }

}, {
  timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)