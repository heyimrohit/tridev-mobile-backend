import express, { Application, Request, Response, NextFunction } from 'express'
import path from 'path'
import router from './router/apiRouter'
import responseMessage from './constant/responseMessage'
import httpError from './util/httpError'
import globalErrorHandler from './middleware/globalErrorHandler'
import helmet from 'helmet'
import cors from 'cors'

const app: Application = express()

//Middleware
app.use(helmet())
app.use(
    cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE','OPTIONS','HEAD'],
        origin: ['*'],
        credentials: false
    })
)
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))

//Routes
app.use('/api/v1', router)

// 404 Handler
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('route'))
    } catch (err) {
        httpError(next, err, req, 404)
    }
})

//Global Error Handler
app.use(globalErrorHandler)

export default app
