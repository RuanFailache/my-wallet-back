import { Router } from 'express'
import { logOut, signIn, signUp } from '@my-wallet/controllers'

const router = Router()

router.post('/login', signIn)
router.post('/register', signUp)
router.delete('/logout', logOut)

export default router
