import { useEffect, useState } from 'react'
import axios from 'axios'

import { io } from 'socket.io-client'
export default function Orders() {

  const [orders, setOrders] = useState([])
  const socket = io('http://localhost:5000')

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-500'
      case 'preparing':
        return 'text-blue-500'
      case 'confirmed':
        return 'text-voilet-500'
      case 'out for Delivery':
        return 'text-orange-500'
      case 'delivered':
        return 'text-green-600'
      default:
        return 'text-gray-500'
    }
  }

  const getProgress = (status) => {
    switch (status) {
      case 'pending':
        return 25
      case 'preparing':
        return 50
      case 'confirmed':
        return 60
      case 'out for Delivery':
        return 75
      case 'delivered':
        return 100
      default:
        return 0
    }
  }

  const fetchOrders = async () => {
    try {

      const token = localStorage.getItem('token')

      const res = await axios.get(
        'http://localhost:5000/api/orders/my',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setOrders(res.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {

    fetchOrders()

    socket.on('orderUpdated', (updatedOrder) => {
       console.log('Socket Event Received')

      fetchOrders()
        

      setOrders(prev =>
        prev.map(order =>
          order._id === updatedOrder._id
            ? updatedOrder
            : order
        )
      )

    })

    return () => {
      socket.off('orderUpdated')
    }

  }, [socket])

  return (
    <div className="p-5">

  <h1 className="text-4xl font-bold mb-5 text-orange-600">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map(order => (

          <div
            key={order._id}
            className="border p-4 mb-4 rounded shadow"
          >

            <p
              className={`font-bold text-lg ${getStatusColor(
                order.currentStatus
              )}`}
            >
              Status: {order.currentStatus}
            </p>

            <div className="bg-green-500 h-2 rounded transition-all duration-1000">
              <div
                className="border p-4 mb-4 rounded shadow hover:shadow-xl hover:scale-105 transition-all duration-300 bg-white"
                style={{
                  width: `${getProgress(
                    order.currentStatus
                  )}%`
                }}
              />
            </div>

            <p className="mt-3">
              Total: ₹{order.totalPrice}
            </p>

            <p className="text-sm text-gray-500">
              Order ID: {order._id}
            </p>

          </div>

        ))
      )}

    </div>
  )
}