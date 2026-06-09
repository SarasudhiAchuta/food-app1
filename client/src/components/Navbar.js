import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {

  const navigate = useNavigate()

  const role = localStorage.getItem('role')
  const token = localStorage.getItem('token')

  const logout = () => {

    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('user')

    navigate('/login')

  }

  return (

    <div className="bg-black text-white p-4 flex gap-4">

      {!token ? (

        <>
          <Link to="/">Home</Link>
          
          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>
        </>

      ) : role === 'admin' ? (

        <>
          <Link to="/admin">
            Dashboard
          </Link>

          <Link to="/admin/orders">
            Admin Orders
          </Link>

          <button onClick={logout}>
            Logout
          </button>
        </>

      ) : (

        <>
          <Link to="/">Home</Link>

          <Link to="/cart">
            Cart
          </Link>

          <Link to="/orders">
            Orders
          </Link>

          <button onClick={logout}>
            Logout
          </button>
        </>

      )}

    </div>

  )

}