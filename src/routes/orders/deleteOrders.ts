import { Response } from 'express'
import ordersModel from '../../models/order'

async function deleteOrders(req, res: Response) {
    const orders = await ordersModel.find().select('id')
    
    orders.map(order => order.deleteOne())

    res.json({ deleted: true })
}

export default deleteOrders