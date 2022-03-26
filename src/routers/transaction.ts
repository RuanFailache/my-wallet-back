import { Router } from 'express'
import * as transactionControllers from '@my-wallet/controllers/transaction'

const router = Router()

router.put('/edit', transactionControllers.editTransaction)
router.delete('/delete', transactionControllers.deleteTransaction)
router.post('/create', transactionControllers.addTransactionToWallet)
router.get('/total-amount', transactionControllers.getWalletTotalAmount)

export default router
