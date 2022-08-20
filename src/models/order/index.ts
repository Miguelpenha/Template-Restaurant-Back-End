import mongoose from 'mongoose'
import { IOrder } from '../../types'
import createdSchema from '../schemasPatterns/created'
import itemListSchema from './schemas/itemList'
import locationSchema from './schemas/location'

const schema = new mongoose.Schema<IOrder>({
    balance: Number,
    withdrawal: Boolean,
    list: {
        type: [itemListSchema],
        select: false
    },
    balanceConverted: String,
    created: createdSchema,
    note: String,
    finished: {
        type: Boolean,
        default: false
    },
    location: {
        type: locationSchema,
        select: false
    }
})

const ordersModel = mongoose.model('orders', schema)

export default ordersModel