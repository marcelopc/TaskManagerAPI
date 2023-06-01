import { type Request, type Response, Router, type NextFunction } from 'express'
import taskController from '@app/controllers/taskController'
import userMiddleware from '@app/middlewares/user'
import { bodyValidation } from '@app/middlewares/validation'
import { userTaskCreateSchema } from '@infrastructure/validations/taskValidation'

const router = Router()

router.get('/tasks', userMiddleware.get, taskController.get)
router.post('/tasks', (req: Request, res: Response, next: NextFunction) => { bodyValidation(req, res, next, userTaskCreateSchema) }, userMiddleware.get, taskController.create)
router.put('/tasks/:taskId', taskController.updateStatus)
router.put('/tasks/:taskId/assign/:userId', taskController.update)
router.get('/tasks/search', taskController.search)

export default router
