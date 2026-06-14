import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = "https://food-app1-1-hs0k.onrender.com"

export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const res = await axios.post(
        `${API_URL}/api/auth/login`,
        {
          email,
          password
        }
      );

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);

      console.log('Role:', res.data.user.role);

      alert('Login Successful');

      if (res.data.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }

    } catch (error) {

      console.error(error);

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert('Unable to connect to the server');
      }

    }

  };

  return (

    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">
        Login
      </h1>

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3"
          required
        />

        <button
          type="submit"
          className="bg-black text-white px-5 py-2 rounded"
        >
          Login
        </button>

        <p className="mt-4 text-center">
          Don't have an account?

          <Link
            to="/register"
            className="text-blue-500 ml-2"
          >
            Register
          </Link>

        </p>

      </form>

    </div>

  );

}