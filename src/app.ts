import cors from 'cors'
import express from 'express'

import BaseRouter from './router'

const app = express()

// Initial config for express
app.use(express.json())
app.use(cors())

// Router
app.use('/', BaseRouter)

export default app
