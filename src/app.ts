import cors from 'cors'
import express from 'express'
import AuthRouter from '@my-wallet/routers/auth'

const app = express()

// Initial config for express
app.use(express.json())
app.use(cors())

// Routes
app.use('/auth', AuthRouter)

export default app
