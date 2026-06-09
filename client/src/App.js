import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Restaurant from './pages/Restaurant'
import Cart from './pages/Cart'
import Orders from './pages/Orders'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminOrders from './pages/AdminOrders'
import AdminDashboard from './pages/AdminDashboard'

import Navbar from './components/Navbar'


function App() {

  return (

    <div>

      <Navbar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/restaurant/:id"
          element={<Restaurant />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/orders"
          element={<Orders />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
          
        />
        <Route
  path="/admin/orders"
  element={<AdminOrders />}
/>
<Route
  path="/admin"
  element={<AdminDashboard />}
/>
     

      </Routes>

    </div>

  )

}

export default App