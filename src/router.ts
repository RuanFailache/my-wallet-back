import { Router } from 'express'

// import middlewares
import protectedRoute from './middlewares/auth'

// import routes
import AuthRouter from './modules/auth/router'
import TransactionRouter from './modules/transaction/router'

const BaseRouter = Router()

BaseRouter.use('/auth', AuthRouter)
BaseRouter.use('/transaction', protectedRoute, TransactionRouter)

export default BaseRouter
