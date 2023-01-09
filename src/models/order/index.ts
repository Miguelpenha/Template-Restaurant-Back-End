import mongoose from 'mongoose'
import { IOrder } from '../../types'
import createdSchema from '../schemasPatterns/created'
import contactSchema from './schemas/contact'
import locationSchema from './schemas/location'
import itemListSchema from './schemas/itemList'

const schema = new mongoose.Schema<IOrder>({
    note: String,
    balance: Number,
    nameUser: String,
    withdrawal: Boolean,
    created: createdSchema,
    methodOfPayment: String,
    balanceConverted: String,
    finished: {
        type: Boolean,
        default: false
    },
    canceled: {
        type: Boolean,
        default: false
    },
    contact: {
        select: false,
        type: contactSchema
    },
    location: {
        select: false,
        type: locationSchema
    },
    list: {
        select: false,
        type: [itemListSchema]
    },
    isBeingPrepared: {
        type: Boolean,
        default: false
    }
})

const ordersModel = mongoose.model('orders', schema)

export default ordersModel