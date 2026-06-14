import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'

import axios from 'axios'

import { CartContext } from '../context/CartContext'

export default function Cart() {

  const {
    cart,
    removeFromCart,
    totalPrice,
    clearCart
  } = useContext(CartContext)

  const navigate = useNavigate()  

  const checkout = async () => {

  try {

    const token = localStorage.getItem('token')

    console.log('TOKEN:', token)

    console.log('CART:', cart)

    console.log('TOTAL PRICE:', totalPrice)

    console.log('RESTAURANT ID:', cart[0]?.restaurantId)

    const res = await axios.post(

      `${process.env.REACT_APP_API_URL}/api/orders`,

      {
        items: cart,
        totalPrice,
        restaurantId: cart[0]?.restaurantId
      },

      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

    )

    console.log('SUCCESS:', res.data)

    alert('Order placed successfully')

    clearCart()

    navigate('/orders')

  } catch (error) {

    console.log('ERROR:', error)

    console.log('RESPONSE:', error.response)

    console.log('DATA:', error.response?.data)

    alert(
      error.response?.data?.message ||
      error.message ||
      'Checkout failed'
    )

  }

}

  return (

    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">

        Cart

      </h1>

      {cart.length === 0 ? (

        <p className="text-xl">

          Cart is empty

        </p>

      ) : (

        <div>

   {Array.isArray(cart) &&
  cart.map((item) => (

            <div
              key={item._id}
              className="border p-4 mb-4 rounded shadow"
            >

              <h2 className="text-2xl font-bold">

                {item.name}

              </h2>

              <p className="mt-2">

                Price: ₹ {item.price}

              </p>

              <p>

                Category: {item.category}

              </p>

              <button
                onClick={() =>
                  removeFromCart(item._id)
                }
                className="bg-red-500 text-white px-4 py-2 rounded mt-3"
              >

                Remove

              </button>

            </div>

          ))}

          <h2 className="text-3xl font-bold mt-5">

            Total: ₹ {totalPrice}

          </h2>

          <button
            onClick={checkout}
            className="bg-green-500 text-white px-6 py-3 rounded mt-5"
          >

            Checkout

          </button>

        </div>

      )}

    </div>

  )

}