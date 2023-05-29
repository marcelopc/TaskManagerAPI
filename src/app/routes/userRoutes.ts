import { Router } from 'express'
import userController from '../controllers/userController'
import { bodyValidation } from '@app/middlewares/validation'
import { userBodySchema } from '@infrastructure/validations/userValidation'
const router = Router()
router.post('/register', (req, res, next) => { bodyValidation(req, res, next, userBodySchema) }, userController.createUser)
router.post('/api/login')

export default router
