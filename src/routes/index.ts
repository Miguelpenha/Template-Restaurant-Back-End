import express from 'express'
import middlewareAuthAPI from '../middlewares/middlewareAuthAPI'
import authRouter from './auth'
import platesRouter from './plates'
import ordersRouter from './orders'

const routes = express.Router()

routes.use('/auth', authRouter)

routes.use(middlewareAuthAPI)
routes.use('/plates', platesRouter)
routes.use('/orders', ordersRouter)

export default routes