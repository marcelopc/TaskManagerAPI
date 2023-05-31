
import { Router } from 'express'
import userRoutes from './userRoutes'
import taskRoutes from './taskRoutes'

const router = Router()

router.use(userRoutes)
router.use(taskRoutes)

export default router
