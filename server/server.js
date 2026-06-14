const express = require('express')
const cors = require('cors')
const http = require('http')
require('dotenv').config()

const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')
const restaurantRoutes = require('./routes/restaurantRoutes')
const menuRoutes = require('./routes/menuRoutes')
const orderRoutes = require('./routes/orderRoutes')
const { Server } = require('socket.io')

const app = express()
const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: [
    'http://localhost:3000',
     'https://food-app1-five.vercel.app'
    ],
    methods: ['GET', 'POST', 'PUT']
   
  }
})

app.set('io', io)
connectDB()
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://food-app1-five.vercel.app'
    ],
    credentials: true
  })
);

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/restaurants', restaurantRoutes)
app.use('/api/menu', menuRoutes)
app.use('/api/orders', orderRoutes)

app.get('/', (req, res) => {
  res.send('API Running...')
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})