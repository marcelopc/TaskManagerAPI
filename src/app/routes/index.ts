
import { Router } from 'express'
import userRoutes from './userRoutes'
import taskRoutes from './taskRoutes'
import { handlerErrorAPI } from '../controllers/errorController'

const router = Router()

router.use(userRoutes)
router.use(taskRoutes)
router.use(handlerErrorAPI)

export default router
