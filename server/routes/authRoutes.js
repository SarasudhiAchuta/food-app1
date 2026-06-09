const express = require('express')

const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')

const User = require('../models/User')

const authMiddleware = require('../middleware/auth')

const router = express.Router()

// TEST ROUTE
router.get('/test', (req, res) => {

  res.send('Auth route working')

})


// REGISTER
router.post('/register', async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      role
    } = req.body

    const existingUser = await User.findOne({
      email
    })

    if (existingUser) {

      return res.status(400).json({
        message: 'User already exists'
      })

    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    )

    const user = new User({

      name,
      email,

      password: hashedPassword,

      role

    })

    await user.save()

    res.status(201).json({

      message: 'User registered successfully'

    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})


// LOGIN
router.post('/login', async (req, res) => {

  try {

    const { email, password } = req.body

    const user = await User.findOne({ email })
     console.log("Email entered:", email)
    console.log("User found:", user)

    if (!user) {

      return res.status(400).json({
        message: 'Invalid credentials'
      })

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    )
     console.log("Password entered:", password)
    console.log("Stored password:", user.password)
    console.log("Password match:", isMatch)

    if (!isMatch) {

      return res.status(400).json({
        message: 'Invalid credentials'
      })

    }

    const token = jwt.sign(

      {

        id: user._id,
        role: user.role

      },

      process.env.JWT_SECRET,

      {

        expiresIn: '7d'

      }

    )

    res.json({

      token,

      user: {

        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role

      }

    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }

})


// PROFILE ROUTE
router.get(
  '/profile',
  authMiddleware,

  (req, res) => {

    res.json({

      message: 'Protected route accessed',

      user: req.user

    })

  }

)

module.exports = router