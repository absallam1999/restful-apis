import express, { NextFunction } from 'express'
import config from '../database/config'
import jwt from 'jsonwebtoken'

const authMiddleware = (
    req: express.Request,
    res: express.Response,
    next: NextFunction
) => {
    try {
        const authorizationHeader = req.headers.authorization
        if (authorizationHeader) {
            const token = authorizationHeader.split(' ')[1]
            if (token) {
                const verify = jwt.verify(token, config.tokensecret as string)
                if (verify) {
                    next()
                } else {
                    res.status(401).json({ message: 'Error Login' })
                }
            } else {
                res.status(401).json({ message: 'Error Login' })
            }
        } else {
            res.status(401).json({ message: 'Error Login' })
        }
    } catch (err) {
        throw new Error(`Error: ${err}`)
    }
}

export default authMiddleware
