import { useEffect, useState } from 'react'

import axios from 'axios'

export default function Home() {

  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {

    fetchRestaurants()

  }, [])

  const fetchRestaurants = async () => {

    try {
        
      const res = await axios.get(
  `${process.env.REACT_APP_API_URL}/api/restaurants`
)
     
      setRestaurants(res.data)

    } catch (error) {

      console.log(error)

    }

  }

  return (

    <div className="p-5">

      <h1 className="text-3xl font-bold mb-5">
        Restaurants
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

       {Array.isArray(restaurants) &&
  restaurants.map((restaurant) => (


          <a
            href={`/restaurant/${restaurant._id}`}
            key={restaurant._id}
            className="border p-4 rounded block hover:bg-gray-100"
          >

            <h2 className="text-xl font-bold">
              {restaurant.name}
            </h2>

            <p>{restaurant.address}</p>

            <p>{restaurant.cuisine}</p>

            <p>⭐ {restaurant.rating}</p>

          </a>

        ))}

      </div>

    </div>

  )

}