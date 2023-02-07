import Router from 'express'
import deviceController from '../controllers/deviceController.js'
import { checkRoleMiddleware } from '../middleware/checkRoleMiddleware.js'

const deviceRouter = new Router()

deviceRouter.post('/', checkRoleMiddleware('ADMIN'), deviceController.create)
deviceRouter.get('/', deviceController.getAll)
deviceRouter.get('/:id', deviceController.getOne)

export default deviceRouter
