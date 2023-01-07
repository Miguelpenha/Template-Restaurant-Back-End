import { Request, Response } from 'express'
import mongoose from 'mongoose'
import ordersModel from '../../models/order'

interface IOrderParams {
    id: string
}

interface IOrderQuery {
    list: (string | undefined)
    contact: (string | undefined)
    location: (string | undefined)
}

async function order(req: Request<IOrderParams, {}, {}, IOrderQuery>, res: Response) {
    const { id } = req.params
    const { list, contact, location } = req.query

    if (mongoose.isValidObjectId(id)) {
        const orderSelect = ordersModel.findById(id)

        const selects: string[] = []

        if (list !== 'false' && list || location !== 'false' && location || contact !== 'false' && contact) {
            list !== 'false' && list && selects.push('+list')
            location !== 'false' && location && selects.push('+location')
            contact !== 'false' && contact && selects.push('+contact')

            orderSelect.select(selects)
        }

        const orderIsExist= await orderSelect

        if (orderIsExist) {
            res.json(orderIsExist)
        } else {
            res.json({ exists: false })
        }
    } else {
        res.json({ exists: false })
    }
}

export default order