import { Pool } from 'pg'
import config from './config'

// Create database Connection with .env Variables
const database = new Pool({
    host: config.host,
    port: parseInt(config.dbPort as string),
    database: config.database,
    user: config.user,
    password: config.password,
})

export default database
