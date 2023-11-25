import { UserStore } from '../models/user.model'
import User from '../models/types/user.type'
import config from '../database/config'
import jwt from 'jsonwebtoken'
import express from 'express'

// Create Instacne From User Model
const userStore = new UserStore()

// CREATE Method Handler
export const createUser = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const newUser = await userStore.createUser(req.body)
        res.status(200).json({
            status: 'SUCCESS',
            user: newUser,
            message: 'User Created Successfully',
        })
    } catch (err) {
        res.status(400)
        throw new Error(`Error: ${err}`)
    }
}
// GET Method Handler
export const getUser = async (req: express.Request, res: express.Response) => {
    try {
        const user = await userStore.getUser(req.params.id as unknown as number)
        res.status(200).json({ user })
    } catch (err) {
        res.status(400)
        throw new Error(`Error: ${err}`)
    }
}
// GET All Method Handler
export const getUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await userStore.getUsers()
        res.status(200).json(users)
    } catch (err) {
        res.status(400)
        throw new Error(`Error:${err}`)
    }
}
// UPDATE Method Handler
export const updateUser = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const user: User = {
            user_name: req.body.user_name,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password,
            id: req.params.id as unknown as number,
        }
        const updatedUser = await userStore.updateUser(user)
        res.status(200).json({
            status: 'SUCCESS',
            user: updatedUser,
            message: 'User Updated Successfully',
        })
    } catch (err) {
        res.status(400)
        throw new Error(`Error: ${err}`)
    }
}
// DELETE Method Handler
export const destroyUser = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const deletedUser = await userStore.deleteUser(
            req.params.id as unknown as number
        )
        res.status(200).json({
            status: 'SUCCESS',
            user: deletedUser,
            message: 'User Deleted',
        })
    } catch (err) {
        res.status(400)
        throw new Error(`Error: ${err}`)
    }
}
// Authenticate Method Handler
export const authenticate = async (
    req: express.Request,
    res: express.Response
) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }
    try {
        const u = await userStore.authenticateUser(user.email, user.password)
        const token = jwt.sign({ u }, config.tokensecret as string)
        if (!u) {
            return res.status(401).json({
                status: 'INVALID DATA',
                message: 'Failed Authenticated .. Please Try Again',
            })
        }
        return res.status(200).json({
            status: 'SUCCESS',
            user: { ...u, token },
            massege: 'Authenticated Successfully',
        })
    } catch (err) {
        res.status(400)
        throw new Error(`Error: ${err}`)
    }
}
