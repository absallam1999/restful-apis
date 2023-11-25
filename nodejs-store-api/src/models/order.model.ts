import OrderProducts from './types/order_product.type'
import database from '../database/index.database'
import Order from './types/order.type'

export class OrderStore {
    // Current Order
    async CurrentOrders(id: number): Promise<Order> {
        try {
            // Open Connection
            const conn = await database.connect()
            const sql =
                'SELECT * FROM users INNER JOIN orders ON $1 = orders.user_id'
            // Run SQL Query
            const result = await conn.query(sql, [id])
            // Release Connection
            conn.release()
            // Retrun Currrent order
            return result.rows[0]
        } catch (err) {
            throw new Error(`Error Get Order ${id}, Error: ${err}`)
        }
    }
    // Add Product to order
    async addProduct(OP: OrderProducts): Promise<OrderProducts> {
        try {
            // Open Connection
            const conn = await database.connect()
            const sql =
                'INSERT INTO order_products (quantity, order_id, prod_id) VALUES($1, $2, $3) RETURNING *'
            // Run SQL Query
            const result = await conn.query(sql, [
                OP.quantity,
                OP.order_id,
                OP.prod_id,
            ])
            // Release Connection
            conn.release()
            // Return added Products
            return result.rows[0]
        } catch (err) {
            throw new Error(
                `Error add product ${OP.prod_id} to order ${OP.order_id}, Error: ${err}`
            )
        }
    }
    // Completed Orders
    async completedOrders(status: string): Promise<Order> {
        try {
            // Open Connection
            const conn = await database.connect()
            const sql = 'SELECT * FROM orders WHERE status=$1'
            // Run SQL Query
            const result = await conn.query(sql, [status])
            // Release Connection
            conn.release()
            // Return Completed Orders
            return result.rows[0]
        } catch (err) {
            throw new Error(`Error Get Completed Orders, Error: ${err}`)
        }
    }
}
