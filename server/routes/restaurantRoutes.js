const express = require('express')

const Restaurant = require('../models/Restaurant')
const MenuItem = require('../models/MenuItem')

const router = express.Router()


// GET ALL RESTAURANTS
router.get('/', async (req, res) => {

  try {

    const restaurants = await Restaurant.find()

    res.json(restaurants)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})


// POST RESTAURANT
router.post('/', async (req, res) => {

  try {

    const restaurant = new Restaurant(req.body)

    await restaurant.save()

    res.status(201).json(restaurant)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})


// GET RESTAURANT MENU
router.get('/:id/menu', async (req, res) => {

  try {

    const menu = await MenuItem.find({
      restaurantId: req.params.id
    })

    res.json(menu)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})

module.exports = router