import { Router } from 'express'
import userController from '../controllers/userController'
import { bodyValidation } from '@app/middlewares/validation'
import { userBodySchema, userLoginSchema } from '@infrastructure/validations/userValidation'

const router = Router()
router.post('/register', (req, res, next) => { bodyValidation(req, res, next, userBodySchema) }, userController.createUser)
router.post('/login', (req, res, next) => { bodyValidation(req, res, next, userLoginSchema) }, userController.login)

export default router
