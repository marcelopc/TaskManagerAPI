import { Router } from 'express'
import taskController from '@app/controllers/taskController'
import { bodyValidation } from '@app/middlewares/validation'
import { userBodySchema, userLoginSchema } from '@infrastructure/validations/userValidation'

const router = Router()

router.get('/tasks', taskController.get)
router.post('/tasks', taskController.create)
router.put('/tasks/:taskId', taskController.update)
router.put('/tasks/:taskId/assign/:userId', taskController.updateStatus)
router.get('/tasks/search', taskController.search)

export default router
