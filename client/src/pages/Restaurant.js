import { useEffect, useState } from 'react'

import axios from 'axios'

import { useParams } from 'react-router-dom'
import { useContext } from 'react'

import { CartContext } from '../context/CartContext'

export default function Restaurant() {

  const { id } = useParams()
  const { addToCart } = useContext(CartContext)

  const [menu, setMenu] = useState([])

  useEffect(() => {

    const fetchMenu = async () => {

      try {

        const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/restaurants/${id}`
        )

        setMenu(res.data)

      } catch (error) {

        console.log(error)

      }

    }

    fetchMenu()

  }, [id])

  return (

    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">
        Menu
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {Array.isArray(menu) &&
  menu.map((item) => (

          <div
            key={item._id}
            className="border p-4 rounded"
          >

            <h2 className="text-xl font-bold">
              {item.name}
            </h2>

            <p>₹ {item.price}</p>

            <p>{item.category}</p>
          <button
           onClick={() => addToCart(item)}
          className="bg-black text-white px-4 py-2 mt-3 rounded">

    Add to Cart

  </button>

          </div>

        ))}

      </div>

    </div>

  )

}