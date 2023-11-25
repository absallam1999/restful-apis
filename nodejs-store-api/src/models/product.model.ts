import database from '../database/index.database'
import Product from './types/product.type'

export class ProductStore {
    // Create Method
    async createProduct(product: Product): Promise<Product> {
        try {
            // Open Connection
            const conn = await database.connect()
            const sql =
                'INSERT INTO products (name, price, category) VALUES($1, $2, $3) RETURNING *'
            // Run SQL Query
            const result = await conn.query(sql, [
                product.name,
                product.price,
                product.category,
            ])
            // Release Connection
            conn.release()
            // Return Created Product
            return result.rows[0]
        } catch (err) {
            throw new Error(
                `Error Create Product ${product.name}, Error: ${err}`
            )
        }
    }
    // Get Method
    async getProduct(id: number): Promise<Product> {
        try {
            // Open Connection
            const conn = await database.connect()
            const sql =
                'SELECT id, name, price, category FROM products WHERE id=($1)'
            // Run SQL Query
            const result = await conn.query(sql, [id])
            // Release Connection
            conn.release()
            // Return One Product
            return result.rows[0]
        } catch (err) {
            throw new Error(`Error Get Product ${id}, Error: ${err}`)
        }
    }
    // Get All Method
    async getProducts(): Promise<Product[]> {
        try {
            // Open Connection
            const conn = await database.connect()
            const sql = 'SELECT id, name, price, category FROM products'
            // Run SQL Query
            const result = await conn.query(sql)
            // Release Connection
            conn.release()
            // Return All Products
            return result.rows
        } catch (err) {
            throw new Error(`Error Get Products, Error: ${err}`)
        }
    }
    // Update Method
    async updateProduct(prod: Product): Promise<Product> {
        try {
            //Open Connection
            const conn = await database.connect()
            const sql =
                'UPDATE products SET name=$1, price=$2, category=$3 WHERE id=$4 RETURNING id, name, price, category'
            // Run SQL Query
            const result = await conn.query(sql, [
                prod.name,
                prod.price,
                prod.category,
                prod.id,
            ])
            //Release Connection
            conn.release()
            //Return Updated Prod
            return result.rows[0]
        } catch (err) {
            throw new Error(`Error Update Product ${prod.name}, Error: ${err}`)
        }
    }
    // Delete Method
    async deleteProduct(id: number): Promise<Product> {
        try {
            // Open Connection
            const conn = await database.connect()
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING id, name'
            // Run SQL Query
            const result = await conn.query(sql, [id])
            // Release Connection
            conn.release()
            //Return Deleted Prod
            return result.rows[0]
        } catch (err) {
            throw new Error(`Error Delete Product ${id}, Error: ${err}`)
        }
    }
    //getProdbycat
    async productsCategory(category: string): Promise<Product[]> {
        try {
            // Open Connection
            const conn = await database.connect()
            const sql = 'SELECT * FROM products WHERE category=($1)'
            // RUN SQL Query
            const result = await conn.query(sql, [category])
            // Release Connection
            conn.release()
            // Return Products
            return result.rows
        } catch (err) {
            throw new Error(`Error Get ${category} Products, Error: ${err}`)
        }
    }
}
