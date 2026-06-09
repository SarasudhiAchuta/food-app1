const express = require('express')

const MenuItem = require('../models/MenuItem')

const authMiddleware = require('../middleware/auth')

const router = express.Router()


// POST MENU ITEM
router.post('/', authMiddleware, async (req, res) => {

  try {

    const menuItem = new MenuItem(req.body)

    await menuItem.save()

    res.status(201).json(menuItem)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})


// UPDATE MENU ITEM
router.put('/:id', authMiddleware, async (req, res) => {

  try {

    const updatedItem = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(updatedItem)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})


// DELETE MENU ITEM
router.delete('/:id', authMiddleware, async (req, res) => {

  try {

    await MenuItem.findByIdAndDelete(req.params.id)

    res.json({
      message: 'Menu item deleted'
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})

module.exports = router