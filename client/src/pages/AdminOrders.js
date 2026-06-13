import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminOrders() {

  const [orders, setOrders] = useState([])

  const fetchOrders = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/orders'
      )

      setOrders(res.data)

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {

    fetchOrders()

  }, [])

  const updateStatus = async (id, status) => {

    try {

      const token = localStorage.getItem('token')

      const res = await axios.put(

`${process.env.REACT_APP_API_URL}/api/orders/${id}/status`,
        { status },

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      )

      console.log(res.data)

      alert('Status Updated')

      fetchOrders()

    } catch (error) {

      console.log(error)
      console.log(error.response?.data)

      alert(
        error.response?.data?.message ||
        'Status update failed'
      )

    }

  }

  return (

    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">
        Admin Orders
      </h1>

      {orders.map((order) => (

        <div
          key={order._id}
          className="border p-4 rounded shadow mb-4"
        >

          <p>
            Order ID: {order._id}
          </p>

          <p>
            Total: ₹{order.totalPrice}
          </p>

          <p>
            Status: {order.currentStatus}
          </p>

          <div className="flex gap-2 mt-3 flex-wrap">

            <button
              onClick={() =>
                updateStatus(
                  order._id,
                  'pending'
                )
              }
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Pending
            </button>

            <button
              onClick={() =>
                updateStatus(
                  order._id,
                  'confirmed'
                )
              }
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Confirmed
            </button>

            <button
              onClick={() =>
                updateStatus(
                  order._id,
                  'preparing'
                )
              }
              className="bg-orange-500 text-white px-3 py-1 rounded"
            >
              Preparing
            </button>

            <button
              onClick={() =>
                updateStatus(
                  order._id,
                  'out_for_delivery'
                )
              }
              className="bg-purple-500 text-white px-3 py-1 rounded"
            >
              Out For Delivery
            </button>

            <button
              onClick={() =>
                updateStatus(
                  order._id,
                  'delivered'
                )
              }
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Delivered
            </button>

          </div>

        </div>

      ))}

    </div>

  )

}