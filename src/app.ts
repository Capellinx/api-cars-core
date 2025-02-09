import 'express-async-errors'
import express, { json } from "express"
import helmet from 'helmet'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { swaggerOptions } from './config/swagger'
import { carsRouter } from './routes/cars'
import { healthRouter } from './routes/health'
import { weebhookRouter } from './routes/weebhook'

const app = express()
const swaggerDocs = swaggerJSDoc(swaggerOptions)

app.use(json())
app.use(helmet())

app.use(carsRouter, healthRouter, weebhookRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

export { app }
