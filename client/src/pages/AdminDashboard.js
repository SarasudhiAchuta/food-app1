import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminDashboard() {

  const [stats, setStats] = useState({

    totalOrders: 0,

    pendingOrders: 0,

    deliveredOrders: 0,

    totalRevenue: 0

  })

  const fetchStats = async () => {

    try {

     const ordersRes = await axios.get(
  'https://food-app1-1-hs0k.onrender.com/api/orders'
)

const restaurantsRes = await axios.get(
  'https://food-app1-1-hs0k.onrender.com/api/restaurants'
)
      setStats(ordersRes.data)

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {

    fetchStats()

  }, [])

  return (

    <div className="p-5">

      <h1 className="text-3xl font-bold mb-6">

        Admin Dashboard

      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

        <div className="bg-blue-500 text-white p-5 rounded shadow">

          <h2 className="text-xl font-bold">
            Total Orders
          </h2>

          <p className="text-3xl mt-2">
            {stats.totalOrders}
          </p>

        </div>

        <div className="bg-yellow-500 text-white p-5 rounded shadow">

          <h2 className="text-xl font-bold">
            Pending Orders
          </h2>

          <p className="text-3xl mt-2">
            {stats.pendingOrders}
          </p>

        </div>

        <div className="bg-green-500 text-white p-5 rounded shadow">

          <h2 className="text-xl font-bold">
            Delivered Orders
          </h2>

          <p className="text-3xl mt-2">
            {stats.deliveredOrders}
          </p>

        </div>

        <div className="bg-purple-500 text-white p-5 rounded shadow">

          <h2 className="text-xl font-bold">
            Revenue
          </h2>

          <p className="text-3xl mt-2">
            ₹{stats.totalRevenue}
          </p>

        </div>

      </div>

    </div>

  )

}
