import { useEffect, useState } from 'react'
import axios from 'axios'

export default function AdminDashboard() {

  const [stats, setStats] = useState({})

  useEffect(() => {

    fetchStats()

  }, [])

  const fetchStats = async () => {

    const res = await axios.get(
      'http://localhost:5000/api/orders/stats'
    )

    setStats(res.data)

  }

  return (

    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-2 gap-4">

        <div className="border p-4 rounded">
          Total Orders:
          {stats.totalOrders}
        </div>

        <div className="border p-4 rounded">
          Pending:
          {stats.pendingOrders}
        </div>

        <div className="border p-4 rounded">
          Delivered:
          {stats.deliveredOrders}
        </div>

        <div className="border p-4 rounded">
          Revenue:
          ₹{stats.totalRevenue}
        </div>

      </div>

    </div>

  )

}