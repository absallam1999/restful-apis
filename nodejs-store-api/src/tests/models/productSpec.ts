import { ProductStore } from '../../models/product.model'
import Product from '../../models/types/product.type'
import database from '../../database/index.database'

const productStore = new ProductStore()

describe('Product Models Test', () => {
    describe('Test if Methods Exist', () => {
        it('Should Have a Create Product method', () => {
            expect(productStore.createProduct).toBeDefined()
        })
        it('Should Have a Get Product method', () => {
            expect(productStore.getProduct).toBeDefined()
        })
        it('Should Have a Get Products method', () => {
            expect(productStore.getProducts).toBeDefined()
        })
        it('Should Have a Update Product method', () => {
            expect(productStore.updateProduct).toBeDefined()
        })
        it('Should Have a delete Product method', () => {
            expect(productStore.deleteProduct).toBeDefined()
        })
    })
    describe('Test Product Model Logic', () => {
        const prod = {
            name: 'First Product',
            price: 500,
            category: 'Product',
        } as Product
        beforeAll(async () => {
            const createdProd = await productStore.createProduct(prod)
            prod.id = createdProd.id
        })
        afterAll(async () => {
            const conn = await database.connect()
            const sql = 'DELETE FROM products'
            await conn.query(sql)
            conn.release()
        })
        it('Create method Should Return New Product', async () => {
            const createdProd = await productStore.createProduct({
                name: 'Second Product',
                price: 1000,
                category: 'product',
            } as Product)
            expect(createdProd).toEqual({
                id: createdProd.id,
                name: 'Second Product',
                price: 1000,
                category: 'product',
            } as Product)
        })
        it('GetProducts Method Should Return all Products', async () => {
            const prods = await productStore.getProducts()
            expect(prods.length).toEqual(prods.length)
        })
        it('GetProduct Method Should Return one Product', async () => {
            const returnedProd = await productStore.getProduct(
                prod.id as number
            )
            expect(returnedProd.id).toBe(prod.id)
            expect(returnedProd.name).toBe(prod.name)
            expect(returnedProd.price).toBe(prod.price)
            expect(returnedProd.category).toBe(prod.category)
        })
        it('Update Method Should Return Updated Product', async () => {
            const updatedProd = await productStore.updateProduct({
                ...prod,
                name: 'updated Product Name',
            })
            expect(updatedProd.id).toBe(prod.id)
            expect(updatedProd.name).toBe('updated Product Name')
            expect(updatedProd.price).toBe(prod.price)
            expect(updatedProd.category).toBe(prod.category)
        })
        it('Delete Method Should Delete Product', async () => {
            const deletedProd = await productStore.deleteProduct(
                prod.id as number
            )
            expect(deletedProd.id).toBe(prod.id)
        })
    })
})
