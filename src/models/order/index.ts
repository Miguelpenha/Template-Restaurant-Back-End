import mongoose from 'mongoose'
import { IOrder } from '../../types'
import createdSchema from '../schemasPatterns/created'
import itemListSchema from './schemas/itemList'
import locationSchema from './schemas/location'
import contactSchema from './schemas/contact'

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
    nameUser: String,
    contact: {
        type: contactSchema,
        select: false
    },
    methodOfPayment: String,
    finished: {
        type: Boolean,
        default: false
    },
    isBeingPrepared: {
        type: Boolean,
        default: false
    },
    canceled: {
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