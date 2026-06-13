const express = require('express')

const Order = require('../models/Order')

const authMiddleware = require('../middleware/auth')

const router = express.Router()


// GET ALL ORDERS (ADMIN)

router.get('/', async (req, res) => {

  try {

    const orders = await Order.find()
      .sort({ createdAt: -1 })

    res.json(orders)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})


// PLACE ORDER

router.post('/', authMiddleware, async (req, res) => {

  try {

    const order = new Order({

      ...req.body,

      customerId: req.user.id,

      currentStatus: 'pending',

      statusHistory: [
        {
          status: 'pending'
        }
      ]

    })

    await order.save()

    res.status(201).json(order)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})


// UPDATE ORDER STATUS

router.put('/:id/status', authMiddleware, async (req, res) => {

  try {

    const order = await Order.findById(
      req.params.id
    )

    if (!order) {

      return res.status(404).json({
        message: 'Order not found'
      })

    }

    order.currentStatus = req.body.status

    order.statusHistory.push({
      status: req.body.status
    })

    await order.save()
    const io = req.app.get('io')

io.emit('orderUpdated', order)

    res.json(order)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})


// GET MY ORDERS

router.get('/my', authMiddleware, async (req, res) => {

  try {

    const orders = await Order.find({
      customerId: req.user.id
    }).sort({
      createdAt: -1
    })
    .limit(5)

    res.json(orders)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})

router.get('/stats', async (req, res) => {

  try {

    const totalOrders = await Order.countDocuments()

    const pendingOrders = await Order.countDocuments({
      currentStatus: 'pending'
    })

    const deliveredOrders = await Order.countDocuments({
      currentStatus: 'delivered'
    })

    const orders = await Order.find()

    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.totalPrice,
      0
    )

    res.json({
      totalOrders,
      pendingOrders,
      deliveredOrders,
      totalRevenue
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})
module.exports = router