# 🍔 FoodApp — Full Stack Food Delivery Application

A full-stack food delivery web application built with the MERN stack
(MongoDB, Express.js, React.js, Node.js), inspired by Swiggy and Zomato.

---

## 📌 Project Overview

FoodApp is a full-stack food delivery platform that connects customers
with local restaurants. It supports two types of users — customers who
browse restaurants and place orders, and restaurant owners who manage
their menus and track incoming orders.

This project was built as part of BTech Computer Science Engineering
to demonstrate real-world full-stack development skills including
REST API design, JWT authentication, role-based access control,
and responsive UI development.

---

## ✨ Features

### 👤 Customer
- Register and login with JWT authentication
- Browse all available restaurants
- Search restaurants by name or cuisine
- View restaurant menu with veg/non-veg indicators
- Add items to cart (warns when switching restaurants)
- Place orders with Cash on Delivery
- View complete order history with status tracking
- Animated progress bar showing order stages
  (Placed → Confirmed → Preparing → On the Way → Delivered)

### 🍽️ Restaurant Owner
- Create and manage restaurant profile
- Add, edit, and delete menu items with categories
- View all incoming customer orders
- Update order status in real time from Admin Panel
- Dashboard showing total orders, revenue, pending orders,
  today's orders, delivered count and menu item count

### 🔐 Security
- JWT-based authentication with 7-day token expiry
- Password hashing with bcryptjs (10 salt rounds)
- Role-based route protection (customer vs restaurant owner)
- Protected API endpoints using custom Express middleware

---

## 🛠️ Tech Stack

### Frontend
| Technology      | Purpose                          |
|-----------------|----------------------------------|
| React.js 19     | UI framework                     |
| React Router v7 | Client-side routing              |
| Axios           | API calls to backend             |
| Context API     | Global state (auth + cart)       |
| Tailwind CSS    | Styling and responsive design    |
| React Toastify  | Success and error notifications  |

### Backend
| Technology    | Purpose                          |
|---------------|----------------------------------|
| Node.js       | JavaScript runtime               |
| Express.js    | Web server and routing           |
| MongoDB Atlas | Cloud database (free tier)       |
| Mongoose      | MongoDB object modeling          |
| JWT           | User authentication tokens       |
| bcryptjs      | Secure password hashing          |
| dotenv        | Environment variable management  |

---

## 📁 Project Structure

```
food-app/
├── client/                     ← React Frontend
│   └── src/
│       ├── pages/
│       │   ├── Login.js        ← Login page
│       │   ├── Register.js     ← Register page
│       │   ├── Home.js         ← Restaurant listing
│       │   ├── Menu.js         ← Restaurant menu
│       │   ├── Cart.js         ← Cart and checkout
│       │   ├── Orders.js       ← Order history
│       │   └── AdminPanel.js   ← Restaurant dashboard
│       ├── context/
│       │   ├── AuthContext.js  ← Auth state management
│       │   └── CartContext.js  ← Cart state management
│       └── components/
│           └── Navbar.js       ← Navigation bar
│
└── server/                     ← Node.js Backend
    ├── models/
    │   ├── User.js             ← User schema
    │   ├── Restaurant.js       ← Restaurant schema
    │   ├── MenuItem.js         ← Menu item schema
    │   └── Order.js            ← Order schema
    ├── routes/
    │   ├── authRoutes.js       ← /api/auth
    │   ├── restaurantRoutes.js ← /api/restaurants
    │   ├── menuRoutes.js       ← /api/menu
    │   └── orderRoutes.js      ← /api/orders
    ├── middleware/
    │   └── auth.js             ← JWT protect + role check
    ├── config/
    │   └── db.js               ← MongoDB connection
    └── server.js               ← Server entry point
```

---

## 🗄️ Database Schema

### User
```
name, email, password (hashed), role (customer/restaurant), timestamps
```

### Restaurant
```
owner (ref: User), name, cuisine[], address,
rating, deliveryTime, deliveryFee, minOrder, isOpen, timestamps
```

### MenuItem
```
restaurant (ref: Restaurant), name, price, category,
description, isVeg, isAvailable, timestamps
```

### Order
```
customer (ref: User), restaurant (ref: Restaurant),
items[{name, price, quantity}], totalAmount,
deliveryAddress, paymentMethod, status, timestamps
```

---

## 🔌 API Endpoints

### Auth — /api/auth
| Method | Endpoint    | Description      | Auth |
|--------|-------------|------------------|------|
| POST   | /register   | Register user    | No   |
| POST   | /login      | Login user       | No   |
| GET    | /me         | Get current user | Yes  |

### Restaurants — /api/restaurants
| Method | Endpoint  | Description              | Auth       |
|--------|-----------|--------------------------|------------|
| GET    | /         | Get all restaurants      | No         |
| GET    | /mine     | Get owner's restaurant   | Restaurant |
| GET    | /:id      | Get single restaurant    | No         |
| POST   | /         | Create restaurant        | Restaurant |
| PUT    | /:id      | Update restaurant        | Restaurant |

### Menu — /api/menu
| Method | Endpoint         | Description      | Auth       |
|--------|------------------|------------------|------------|
| GET    | /:restaurantId   | Get menu items   | No         |
| POST   | /                | Add menu item    | Restaurant |
| PUT    | /:id             | Update item      | Restaurant |
| DELETE | /:id             | Delete item      | Restaurant |

### Orders — /api/orders
| Method | Endpoint        | Description            | Auth       |
|--------|-----------------|------------------------|------------|
| POST   | /               | Place order            | Customer   |
| GET    | /my             | Get customer orders    | Customer   |
| GET    | /restaurant     | Get restaurant orders  | Restaurant |
| PUT    | /:id/status     | Update order status    | Restaurant |

---

## ⚙️ Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/yourusername/food-app.git
cd food-app
```

### 2. Setup backend
```bash
cd server
npm install
```

Create `.env` file:
```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/food-app
JWT_SECRET=your_secret_key
```

Run server:
```bash
npm run dev
```

### 3. Setup frontend
```bash
cd client
npm install
npm start
```

App runs at: http://localhost:3000
API runs at: http://localhost:5000

---

## 🎯 What I Learned

- Designing and building a REST API from scratch with Express.js
- JWT authentication flow with token generation and verification
- Role-based access control using custom Express middleware
- MongoDB schema design with relationships using Mongoose
- React Context API for managing global auth and cart state
- Connecting frontend and backend with Axios and proxy configuration
- Debugging full-stack issues including CORS, auth headers,
  model naming errors, and middleware problems
- Deploying a MERN application to cloud platforms

---

## 🔮 Future Improvements

- [ ] Real-time order tracking with Socket.io
- [ ] Online payment integration (Razorpay)
- [ ] Email notifications with Nodemailer
- [ ] Food item images with Cloudinary
- [ ] Delivery location with Google Maps
- [ ] Mobile responsive improvements
- [ ] Order rating and review system
- [ ] Coupon and discount system

---

## 🐛 Challenges Faced

- Fixed middleware import errors caused by wrong file naming (uppercase vs lowercase)
- Resolved proxy configuration issues between React and Node.js
- Debugged bcrypt `pre('save')` hook — wrong function signature caused
  "next is not a function" error
- Fixed duplicate route registration in server.js causing request conflicts
- Removed backend-only packages (express, mongoose, bcryptjs) that were
  accidentally installed in the React client folder

---

## 👨‍💻 Developer

**Abhi** — BTech Computer Science Engineering  
GitHub: https://github.com/yourusername  
LinkedIn: https://linkedin.com/in/yourprofile  

---

## 📄 License

MIT License — free to use for learning purposes.
