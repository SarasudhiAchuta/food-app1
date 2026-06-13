import { useState } from 'react'
import { Link } from 'react-router-dom'

import axios from 'axios'

import { useNavigate } from 'react-router-dom'

export default function Register() {

  const navigate = useNavigate()

  const [name, setName] = useState('')

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const handleRegister = async (e) => {

    e.preventDefault()

    try {

      await axios.post(

       'https://food-app1-1-hs0k.onrender.com/api/auth/register',

        {

          name,
          email,
          password,
          role: 'customer'

        }

      )

      alert('Registration Successful')

      navigate('/login')

    } catch (error) {

      console.log(error)
      console.log(error.response?.data)
      alert(
        error.response?.data?.message ||
        'Registration Failed'
      )

   

    }

  }

  return (

    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">

        Register

      </h1>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="border p-2 w-full mb-3"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="border p-2 w-full mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="border p-2 w-full mb-3"
        />

        <button
          type="submit"
          className="bg-black text-white px-5 py-2 rounded"
        >

          Register

        </button>
        <p className="mt-4 text-center">

  Already have an account?

  <Link
    to="/login"
    className="text-blue-500 ml-2"
  >
    Login
  </Link>

</p>

      </form>

    </div>

  )

}