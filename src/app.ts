import 'express-async-errors'
import express, { json } from "express"
import helmet from 'helmet'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { swaggerOptions } from './config/swagger'

const app = express()
const swaggerDocs = swaggerJSDoc(swaggerOptions)

app.use(json())
app.use(helmet())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

export { app }
