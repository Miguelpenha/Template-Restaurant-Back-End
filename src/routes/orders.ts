import express, { Request } from 'express'
import ordersModel from '../models/order'
import { IItemList, ILocation } from '../types'
import mongoose from 'mongoose'

const ordersRouter = express.Router()

ordersRouter.get('/', async (req: Request<{}, {}, {}, {
    list: (string | undefined)
    count: (string | undefined)
    location: (string | undefined)
}>, res) => {
    const { count, list, location } = req.query

    if (count !== 'false' && count) {
        res.json({ count: await ordersModel.estimatedDocumentCount() })
    } else {
        const orders = ordersModel.find()

        const selects: string[] = []

        if (list !== 'false' && list || location !== 'false' && location) {
            list !== 'false' && list && selects.push('+list')
            location !== 'false' && location && selects.push('+location')

            orders.select(selects)
        }

        res.json(await orders)
    }
})

ordersRouter.get('/:id', async(req, res) => {
    const { id } = req.params

    if (mongoose.isValidObjectId(id)) {
        const orderSelect = ordersModel.findById(id)

        const orderIsExist= await orderSelect

        if (orderIsExist) {
            res.json(orderIsExist)
        } else {
            res.json({ exists: false })
        }
    } else {
        res.json({ exists: false })
    }
})

ordersRouter.post('/', async (req: Request<{}, {}, {
    note: string
    balance: number
    list: IItemList[]
    location: ILocation
    withdrawal: boolean
    balanceConverted: string
}>, res) => {
    let { balance, balanceConverted, list, location, note, withdrawal } = req.body
    
    await ordersModel.create({
        balance,
        balanceConverted,
        list,
        location,
        note,
        withdrawal
    })
    
    res.json({ created: true })
})

export default ordersRouter