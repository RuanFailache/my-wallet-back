import { Router } from 'express'
import * as authControllers from '@my-wallet/controllers/auth'

const router = Router()

router.post('/login', authControllers.signIn)
router.post('/register', authControllers.signUp)
router.delete('/logout', authControllers.logOut)

export default router
