import { ProductStore } from '../models/product.model'
import Product from '../models/types/product.type'
import express from 'express'

// Create Instance From Product Store
const productStore = new ProductStore()

// Create Method Handler
export const createProduct = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const newProduct = await productStore.createProduct(req.body)
        res.status(200).json({
            status: 'SUCCESS',
            prod: newProduct,
            message: 'Product Created Successfully',
        })
    } catch (err) {
        res.status(400)
        throw new Error(`Error: ${err}`)
    }
}
// Get Method Handler
export const getProduct = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const product = await productStore.getProduct(
            req.params.id as unknown as number
        )
        res.status(200).json({ product })
    } catch (err) {
        res.status(400)
        throw new Error(`Error: ${err}`)
    }
}
// Get All Method Handler
export const getProducts = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const products = await productStore.getProducts()
        res.status(200).json(products)
    } catch (err) {
        res.status(400)
        throw new Error(`Error: ${err}`)
    }
}
// Update Method Handler
export const updateProduct = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const prod: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            id: req.params.id as unknown as number,
        }
        const updatedProduct = await productStore.updateProduct(prod)
        res.status(200).json({
            status: 'SUCCESS',
            prod: updatedProduct,
            message: 'Product Updated Successfully',
        })
    } catch (err) {
        res.status(400)
        throw new Error(`Error: ${err}`)
    }
}
// Delete Method Handler
export const destroyProduct = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const deletedProduct = await productStore.deleteProduct(
            req.params.id as unknown as number
        )
        res.status(200).json({
            status: 'SUCCESS',
            prod: deletedProduct,
            message: 'Product Deleted Successfully',
        })
    } catch (err) {
        throw new Error(`Error: ${err}`)
    }
}
// ProductByCat Handler
export const getProdbyCat = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const category = req.params.category
        const products = await productStore.productsCategory(category)
        res.status(200).json({ ProductsByCategory: `${category}`, products })
    } catch (err) {
        res.status(400)
        throw new Error(`Error: ${err}`)
    }
}
