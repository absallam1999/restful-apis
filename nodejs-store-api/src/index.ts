import logger from './middlewares/logger.middleware'
import routes from './routes/index.routes'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

// Create Instance Server
const app: express.Application = express()
const PORT = 3000

// Middlewares
app.use(
        cors(),                   //  Cors Middleware
         logger,                 //  Logger Middleware
            helmet(),           //  Security Middleware
             express.json()    // JSON Parser
)

// Routing For ('/api') Path
app.use('/api', routes)

// Routing For ('/') Path
app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Server Started!')
})

// Routing For Bad Requests
app.use((req: express.Request, res: express.Response) => {
    res.status(404).json({
        message: '404 NOT FOUND!',
    })
})

// Server listener
app.listen(PORT, () => {
    console.log(`Server Started at http://localhost:${PORT}`)
})

export default app
