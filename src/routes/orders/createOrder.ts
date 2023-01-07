import { IItemList, ILocation } from '../../types'
import { Request, Response } from 'express'
import ordersModel from '../../models/order'

interface ICreateOrderBody {
    note: string
    balance: number
    nameUser: string
    list: IItemList[]
    location: ILocation
    withdrawal: boolean
    methodOfPayment: string
    balanceConverted: string
    contact: {
        email?: string
        telephone: string
    }
}

async function createOrder(req: Request<{}, {}, ICreateOrderBody>, res: Response) {
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
}

export default createOrder