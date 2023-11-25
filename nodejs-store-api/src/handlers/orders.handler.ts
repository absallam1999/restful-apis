import { OrderStore } from '../models/order.model'
import express from 'express'

// Create Instance From Order Store
const orderStore = new OrderStore()

// Get Current Orders Handler
export const currentOrders = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const currentOrders = await orderStore.CurrentOrders(
            req.params.id as unknown as number
        )
        res.status(200).json({
            message: 'Current Orders By User',
            orders: currentOrders,
        })
    } catch (err) {
        res.status(400)
        throw new Error(`Error: ${err}`)
    }
}
// Add Product to Order Handler
export const addProduct = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const addedProduct = await orderStore.addProduct(req.body)
        res.status(200).json({
            status: 'SUCCESS',
            addedProduct,
            message: 'Product Added Successfully',
        })
    } catch (err) {
        res.status(400)
        throw new Error(`Error: ${err}`)
    }
}
// Completed Orders Handler
export const completedOrders = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const completedOrders = await orderStore.completedOrders(
            req.params.status
        )
        res.status(200).json(completedOrders)
    } catch (err) {
        res.status(400)
        throw new Error(`Error: ${err}`)
    }
}
