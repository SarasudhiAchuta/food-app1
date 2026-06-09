import { createContext, useState } from 'react'

export const CartContext = createContext()

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([])

  const addToCart = (item) => {

    setCart([...cart, item])

  }

  const removeFromCart = (id) => {

    const updatedCart = cart.filter(
      (item) => item._id !== id
    )

    setCart(updatedCart)

  }

  const clearCart = () => {

    setCart([])

  }

  const totalPrice = cart.reduce(

    (total, item) => total + item.price,

    0

  )

  return (

    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice
      }}
    >

      {children}

    </CartContext.Provider>

  )

}