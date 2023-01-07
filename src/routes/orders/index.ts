import express from 'express'
import orders from './orders'
import order from './order'
import createOrder from './createOrder'
import editOrder from './editOrder'
import deleteOrders from './deleteOrders'
import deleteOrder from './deleteOrder'

const ordersRouter = express.Router()

ordersRouter.get('/', orders)
ordersRouter.get('/:id', order)
ordersRouter.post('/', createOrder)
ordersRouter.patch('/:id', editOrder)
ordersRouter.delete('/', deleteOrders)
ordersRouter.delete('/:id', deleteOrder)

export default ordersRouter