import express, { NextFunction } from 'express'

const logger = (
    req: express.Request,
    res: express.Response,
    next: NextFunction
): void => {
    const url = req.url
    const status = res.statusCode
    const method = req.method
    const proto = req.protocol
    const date = new Date()
    console.log(
        `${url} --was visted! \n '${method} -- ${proto} -- ${status}' \n [${date}] \n`
    )
    next()
}

export default logger
