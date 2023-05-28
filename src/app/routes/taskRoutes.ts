import { Router } from 'express'

const router = Router()

router.get('/tasks')
router.post('/tasks')
router.put('/tasks/:taskId')
router.put('/tasks/:taskId/assign/:userId')
router.get('/tasks/search')

export default router
