import express from 'express'
import {
    addProduct,
    currentOrders,
    completedOrders,
} from '../../handlers/orders.handler'
import authMiddleware from '../../middlewares/authentication.middleware'

// Create Instance Router
const orderRoutes = express.Router()

// Add Order Routes to /api/orders
orderRoutes.get('/:id', authMiddleware, currentOrders)
orderRoutes.post('/:id/product', authMiddleware, addProduct)
orderRoutes.get('/:id/status', authMiddleware, completedOrders)

export default orderRoutes
