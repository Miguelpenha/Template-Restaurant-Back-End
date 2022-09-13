import express, { Request } from 'express'
import ordersModel from '../models/order'
import { IItemList, ILocation } from '../types'
import mongoose from 'mongoose'

const ordersRouter = express.Router()

ordersRouter.get('/', async (req: Request<{}, {}, {}, {
    list: (string | undefined)
    count: (string | undefined)
    contact: (string | undefined)
    finished: (string | undefined)
    canceled: (string | undefined)
    location: (string | undefined)
    isBeingPrepared: (string | undefined)
}>, res) => {
    const { count, list, location, contact, finished, canceled, isBeingPrepared } = req.query

    if (count !== 'false' && count) {
        res.json({ count: await ordersModel.estimatedDocumentCount() })
    } else {
        const query = {} as { finished?: boolean, canceled?: boolean, isBeingPrepared?: boolean }

        if (finished) {
            query.finished = true
        }

        if (canceled) {
            query.canceled = true
        }

        if (isBeingPrepared) {
            query.isBeingPrepared = true
        }

        const orders = ordersModel.find(query)

        const selects: string[] = []

        if (list !== 'false' && list || location !== 'false' && location || contact !== 'false' && contact) {
            list !== 'false' && list && selects.push('+list')
            location !== 'false' && location && selects.push('+location')
            contact !== 'false' && contact && selects.push('+contact')

            orders.select(selects)
        }

        res.json(await orders)
    }
})

ordersRouter.get('/:id', async(req: Request<{ id: string }, {}, {}, {
    list: (string | undefined)
    contact: (string | undefined)
    location: (string | undefined)
}>, res) => {
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
})

ordersRouter.post('/', async (req: Request<{}, {}, {
    note: string
    balance: number
    nameUser: string
    contact: {
        email?: string
        telephone: string
    }
    list: IItemList[]
    location: ILocation
    withdrawal: boolean
    balanceConverted: string
    methodOfPayment: string
}>, res) => {
    let { balance, balanceConverted, list, location, note, withdrawal, contact, nameUser, methodOfPayment } = req.body
    
    const order = await ordersModel.create({
        balance,
        balanceConverted,
        list,
        location,
        note,
        withdrawal,
        contact,
        nameUser,
        methodOfPayment
    })
    
    res.json({ created: true, order: order })
})

ordersRouter.delete('/', async (req, res) => {
    const orders = await ordersModel.find().select('id')
    
    orders.map(order => order.deleteOne())

    res.json({ deleted: true })
})

ordersRouter.delete('/:id', async (req: Request<{ id: string }>, res) => {
    try {
        await ordersModel.findByIdAndDelete(req.params.id)

        res.json({ deleted: true })
    } catch {
        res.json({ exists: false })
    }
})

ordersRouter.patch('/:id', async (req: Request<{ id: string }, {}, {
    note: string
    balance: number
    list: IItemList[]
    location: ILocation
    withdrawal: boolean
    finished: boolean
    balanceConverted: string
    nameUser: string
    isBeingPrepared: boolean
    canceled: boolean
    contact: {
        email?: string
        telephone: string
    }
    methodOfPayment: string
}>, res) => {
    const { id: idOrder } = req.params

    if (mongoose.isValidObjectId(idOrder)) {
        const orderEdit = await ordersModel.findById(idOrder).select(['id'])

        if (orderEdit) {
            let { balance, balanceConverted, list, location, note, withdrawal, finished, contact, methodOfPayment, nameUser, canceled, isBeingPrepared } = req.body

            await orderEdit.updateOne({
                balance,
                balanceConverted,
                list,
                location,
                note,
                withdrawal,
                finished,
                contact,
                methodOfPayment,
                nameUser,
                canceled,
                isBeingPrepared
            })

            res.json({ edited: true })
        } else {
            res.json({ exists: false })
        }
    } else {
        res.json({ exists: false })
    }
})

export default ordersRouter