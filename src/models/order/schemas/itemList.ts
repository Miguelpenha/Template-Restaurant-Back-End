import mongoose from 'mongoose'
import { IItemList } from '../../../types'
import photoSchema from '../../schemasPatterns/photo'
import createdSchema from '../../schemasPatterns/created'

const itemListSchema = new mongoose.Schema<IItemList>({
    name: String,
    price: Number,
    photo: {
        type: photoSchema,
        select: false
    },
    weight: Number,
    description: String,
    peoplesCount: Number,
    priceConverted: String,
    note: String,
    onList: Boolean,
    quantity: Number,
    totalPrice: Number,
    totalPriceConverted: String,
    created: createdSchema
})

export default itemListSchema