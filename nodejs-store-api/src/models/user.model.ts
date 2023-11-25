import database from '../database/index.database'
import config from '../database/config'
import User from './types/user.type'
import bcrypt from 'bcrypt'

// Hashing Password With BCRYPT
const hash = (password: string) => {
    const salt = parseInt(config.salt as string)
    return bcrypt.hashSync(password + config.pepper, salt)
}

export class UserStore {
    // Create Method
    async createUser(user: User): Promise<User> {
        try {
            // Open Connection
            const conn = await database.connect()
            const sql =
                'INSERT INTO users (user_name, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, user_name, first_name, last_name, email'
            // Run SQL Query
            const result = await conn.query(sql, [
                user.user_name,
                user.first_name,
                user.last_name,
                user.email,
                hash(user.password),
            ])
            // Release Connection
            conn.release()
            // Return Created User
            return result.rows[0]
        } catch (err) {
            throw new Error(`Error Create ${user.user_name}, Error: ${err}`)
        }
    }
    // Get Method
    async getUser(id: number): Promise<User> {
        try {
            // Open Connection
            const conn = await database.connect()
            const sql =
                'SELECT id, user_name, first_name, last_name, email FROM users WHERE id=($1)'
            // Run SQL Query
            const result = await conn.query(sql, [id])
            // Release Connection
            conn.release()
            // Return One User
            return result.rows[0]
        } catch (err) {
            throw new Error(`Error Get User ${id}, Error: ${err}`)
        }
    }
    // Get All Method
    async getUsers(): Promise<User[]> {
        try {
            // Open Connection
            const conn = await database.connect()
            const sql =
                'SELECT id, user_name, first_name, last_name, email FROM users'
            // Run SQL Query
            const result = await conn.query(sql)
            // Release Connection
            conn.release()
            // Return All Users
            return result.rows
        } catch (err) {
            throw new Error(`Error Get Users ${err}`)
        }
    }
    // Update Method
    async updateUser(user: User): Promise<User> {
        try {
            // Open Connection
            const conn = await database.connect()
            const sql =
                'UPDATE users SET user_name=$1, first_name=$2, last_name=$3, email=$4, password=$5 WHERE id=$6 RETURNING id, user_name, first_name, last_name, email'
            // Run SQL Query
            const result = await conn.query(sql, [
                user.user_name,
                user.first_name,
                user.last_name,
                user.email,
                hash(user.password),
                user.id,
            ])
            // Release Connection
            conn.release()
            // Return Updated User
            return result.rows[0]
        } catch (err) {
            throw new Error(
                `Error Update User ${user.user_name}, Error: ${err}`
            )
        }
    }
    // Delete Method
    async deleteUser(id: number): Promise<User> {
        try {
            // Open Connection
            const conn = await database.connect()
            const sql =
                'DELETE FROM users WHERE id=($1) RETURNING id, user_name, email'
            // Run SQL Query
            const result = await conn.query(sql, [id])
            // Release Connection
            conn.release()
            // Return Deleted User
            return result.rows[0]
        } catch (err) {
            throw new Error(`Error Delete User ${id}, Error: ${err}`)
        }
    }
    // Authenticate Method
    async authenticateUser(
        email: string,
        password: string
    ): Promise<User | null> {
        try {
            // Open Connection
            const conn = await database.connect()
            const sql = 'SELECT password FROM users WHERE email=$1'
            // Run SQL Query
            const result = await conn.query(sql, [email])
            // IF True (email & password exist)
            if (result.rows.length) {
                const { password: hash } = result.rows[0]
                const isValid = bcrypt.compareSync(
                    password + config.pepper,
                    hash
                )
                // IF True (return user info)
                if (isValid) {
                    const sql =
                        'SELECT id, user_name, first_name, last_name, email FROM users WHERE email=$1'
                    const userData = await conn.query(sql, [email])
                    return userData.rows[0]
                }
            }
            // Release Connection
            conn.release()
            return null
        } catch (err) {
            throw new Error(`Error Authenticate Password with Email ${email}`)
        }
    }
}