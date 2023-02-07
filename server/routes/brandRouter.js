import Router from 'express'
import brandController from '../controllers/brandController.js'
import { checkRoleMiddleware } from '../middleware/checkRoleMiddleware.js'

const brandRouter = new Router()

brandRouter.post('/', checkRoleMiddleware('ADMIN'), brandController.create)
brandRouter.get('/', brandController.getAll)

export default brandRouter
