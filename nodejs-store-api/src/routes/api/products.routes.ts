import express from 'express'
import {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    destroyProduct,
    getProdbyCat,
} from '../../handlers/products.handler'
import authMiddleware from '../../middlewares/authentication.middleware'

// Create Instance Router
const productRoutes = express.Router()

// Add Product Routes to /api/products
productRoutes.get('/', getProducts)
productRoutes.get('/:id', getProduct)
productRoutes.patch('/:id', updateProduct)
productRoutes.delete('/:id', destroyProduct)
productRoutes.post('/', authMiddleware, createProduct)
productRoutes.get('/category/:category', getProdbyCat)

export default productRoutes
