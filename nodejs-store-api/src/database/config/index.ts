import dotenv from 'dotenv'

// Config .env Variables
dotenv.config()

const {
    PORT,
    ENV,
    POSTGRES_HOST,
    POSTGRES_DB_PORT,
    POSTGRES_DB,
    POSTGRES_DB_TEST,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
    BCRYPT_PASSWORD,
    SALT_ROUNDS,
    SECRET_TOKEN
} = process.env

// Export .env Variables
export default {
    port: PORT,
    host: POSTGRES_HOST,
    dbPort: POSTGRES_DB_PORT,
    database: ENV === 'dev' ? POSTGRES_DB_TEST : POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    pepper: BCRYPT_PASSWORD,
    salt: SALT_ROUNDS,
    tokensecret: SECRET_TOKEN
}
