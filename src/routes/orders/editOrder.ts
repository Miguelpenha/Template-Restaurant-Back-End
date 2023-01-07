import { Request, Response } from 'express'
import { IItemList, ILocation } from '../../types'
import mongoose from 'mongoose'
import ordersModel from '../../models/order'

interface IEditOrderParams {
    id: string
}

interface IEditOrderQuery {
    note: string
    balance: number
    nameUser: string
    canceled: boolean
    list: IItemList[]
    finished: boolean
    location: ILocation
    withdrawal: boolean
    methodOfPayment: string
    balanceConverted: string
    isBeingPrepared: boolean
    contact: {
        email?: string
        telephone: string
    }
}

async function editOrder(req: Request<IEditOrderParams, {}, IEditOrderQuery>, res: Response) {
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
}

export default editOrder