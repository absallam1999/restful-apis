import productRoutes from './api/products.routes'
import orderRoutes from './api/orders.routes'
import userRoutes from './api/users.routes'
import express from 'express'

// Create Instance Router
const routes = express.Router()

// Use User Routes to /api/users
routes.use('/users', userRoutes)
// Use OrderProducts Routes to /api/orders
routes.use('/orders', orderRoutes)
// Use Products Routes to /api/products
routes.use('/products', productRoutes)

export default routes
