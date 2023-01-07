import mongoose from 'mongoose'
import { IItemList } from '../../../types'
import createdSchema from '../../schemasPatterns/created'
import photoSchema from '../../schemasPatterns/photo'

const itemListSchema = new mongoose.Schema<IItemList>({
    note: String,
    name: String,
    price: Number,
    weight: Number,
    onList: Boolean,
    quantity: Number,
    totalPrice: Number,
    description: String,
    peoplesCount: Number,
    priceConverted: String,
    created: createdSchema,
    totalPriceConverted: String,
    photo: {
        type: photoSchema,
        select: false
    }
})

export default itemListSchema