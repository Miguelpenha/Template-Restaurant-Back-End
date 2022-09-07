import express from 'express'
import middlewareAPI from '../middlewares/middlewareAPI'
import authRouter from './auth'
import platesRouter from './plates'
import ordersRouter from './orders'

const routes = express.Router()

routes.use('/auth', authRouter)
routes.use(middlewareAPI)
routes.use('/plates', platesRouter)
routes.use('/orders', ordersRouter)

export default routes