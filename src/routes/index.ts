import express from 'express'
import middlewareAPI from '../middlewares/middlewareAPI'
import platesRouter from './plates'

const routes = express.Router()

routes.use(middlewareAPI)
routes.use('/plates', platesRouter)

export default routes