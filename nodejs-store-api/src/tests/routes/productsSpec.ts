import { ProductStore } from '../../models/product.model'
import Product from '../../models/types/product.type'
import database from '../../database/index.database'
import supertest from 'supertest'
import app from '../../index'

const productStore = new ProductStore()
const request = supertest(app)
const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1Ijp7ImlkIjo2LCJ1c2VyX25hbWUiOiJBaG1lZDIwIiwiZmlyc3RfbmFtZSI6IkFobWVkIiwibGFzdF9uYW1lIjoiYmFkciIsImVtYWlsIjoidGVzdDIwQHRlc3QuY29tIn0sImlhdCI6MTY2ODQ0MTc5OH0.0Qmf47wb3sXM5t7M8A7BIU9i6yGv3FI1Qq6L5ovG1ds'

describe('Product API Endpoints', async () => {
    const prod = {
        name: 'First Product',
        price: 1000,
        category: 'Product',
    } as Product

    beforeAll(async () => {
        const createdProduct = await productStore.createProduct(prod)
        prod.id = createdProduct.id
    })

    afterAll(async () => {
        const conn = await database.connect()
        const sql = 'DELETE FROM products'
        await conn.query(sql)
        conn.release()
    })

    describe('Test Products CRUD APIs Methods', () => {
        it('Should Create Product', async () => {
            const response = await request
                .post('/api/products/')
                .set('Content-type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    name: 'Second Product',
                    price: 1000,
                    category: 'Product',
                } as Product)
            expect(response.status).toBe(200)
            const { name, price, category } = response.body.prod
            expect(name).toBe('Second Product')
            expect(price).toBe(1000)
            expect(category).toBe('Product')
        })
        it('Should Get Products', async () => {
            const response = await request
                .get('/api/products/')
                .set('Content-type', 'application/json')
            expect(response.status).toBe(200)
            expect(response.body.products).toBe(response.body.products)
        })
        it('Should Get Product', async () => {
            const response = await request
                .get(`/api/products/${prod.id}`)
                .set('Content-type', 'application/json')
            expect(response.status).toBe(200)
            expect(response.body.product.name).toBe('First Product')
            expect(response.body.product.price).toBe(1000)
        })
        it('Should Update Product', async () => {
            const response = await request
                .patch(`/api/products/${prod.id}`)
                .set('Content-type', 'application/json')
                .send({ ...prod, name: 'New Product' })
            expect(response.status).toBe(200)
            const { id, name, price, category } = response.body.prod
            expect(id).toBe(prod.id)
            expect(name).toBe('New Product')
            expect(price).toBe(prod.price)
            expect(category).toBe(prod.category)
        })
        it('Should Delete Product', async () => {
            const response = await request
                .delete(`/api/products/${prod.id}`)
                .set('Content-type', 'application/json')
            expect(response.status).toBe(200)
            expect(response.body.prod.id).toBe(prod.id)
            expect(response.body.prod.name).toBe('New Product')
        })
    })
})
