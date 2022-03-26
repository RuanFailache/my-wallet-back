import cors from 'cors'
import express from 'express'

import AuthRouter from '@my-wallet/routers/auth'
import TransactionRouter from '@my-wallet/routers/transaction'

import protectedRoute from './middlewares/auth'

const app = express()

// Initial config for express
app.use(express.json())
app.use(cors())

// Routes
app.use('/auth', AuthRouter)
app.use('/transaction', protectedRoute, TransactionRouter)

export default app
