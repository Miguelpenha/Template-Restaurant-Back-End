import mongoose from 'mongoose'
import { IPlate } from '../types'
import createdSchema from './schemasPatterns/created'
import photoSchema from './schemasPatterns/photo'
import photoDefaultSchema from './schemasPatterns/photoDefault'

const schema = new mongoose.Schema<IPlate>({
    name: String,
    price: Number,
    weight: Number,
    description: String,
    peoplesCount: Number,
    priceConverted: String,
    created: createdSchema,
    photo: {
        type: photoSchema,
        select: false,
        default: photoDefaultSchema
    }
})

const platesModel = mongoose.model('plates', schema)

export default platesModel