import protectedRoute from '@my-wallet/middlewares/auth'
import { Router } from 'express'

import * as authControllers from './controllers'

const router = Router()

router.post('/login', authControllers.signIn)
router.post('/register', authControllers.signUp)
router.delete('/logout', protectedRoute, authControllers.logOut)

export default router
