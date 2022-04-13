import { Router } from 'express'

import * as transactionControllers from './controllers'

const router = Router()

router.get('/', transactionControllers.getWallet)
router.put('/edit', transactionControllers.editTransaction)
router.delete('/delete', transactionControllers.deleteTransaction)
router.post('/create', transactionControllers.addTransactionToWallet)

export default router
