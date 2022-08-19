import mongoose from 'mongoose'
import { IOrder } from '../types'
import created from './schemasPatterns/created'

const schema = new mongoose.Schema<IOrder>({
    name: String,
    created
})

const ordersModel = mongoose.model('orders', schema)

export default ordersModel