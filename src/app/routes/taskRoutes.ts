import { type Request, type Response, Router, type NextFunction } from 'express'
import taskController from '@app/controllers/taskController'
import userMiddleware from '@app/middlewares/user'
import { bodyValidation } from '@app/middlewares/validation'
import { userTaskCreateSchema } from '@infrastructure/validations/taskValidation'
import { Authenticator } from '@app/Auth'
const router = Router()

router.get('/tasks', Authenticator, userMiddleware.get, taskController.get)
router.post('/tasks', Authenticator, (req: Request, res: Response, next: NextFunction) => { bodyValidation(req, res, next, userTaskCreateSchema) }, userMiddleware.get, taskController.create)
router.put('/tasks/:taskId', Authenticator, taskController.updateStatus)
router.put('/tasks/:taskId/assign/:userId', Authenticator, taskController.update)
router.get('/tasks/search', Authenticator, taskController.search)

export default router
