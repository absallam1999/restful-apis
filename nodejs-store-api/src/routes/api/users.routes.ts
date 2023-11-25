import express from 'express'
import {
    createUser,
    getUser,
    getUsers,
    updateUser,
    destroyUser,
    authenticate,
} from '../../handlers/users.handler'
import authMiddleware from '../../middlewares/authentication.middleware'

// Create Instance Router
const userRoutes = express.Router()

// Add User Routes to /api/users
userRoutes.post('/', createUser)
userRoutes.get('/', authMiddleware, getUsers)
userRoutes.post('/authenticate', authenticate)
userRoutes.get('/:id', authMiddleware, getUser)
userRoutes.patch('/:id', authMiddleware, updateUser)
userRoutes.delete('/:id', authMiddleware, destroyUser)

export default userRoutes
