import mongoose from 'mongoose'
import { IPlate } from '../types'
import photoSchema from './schemasPatterns/photo'
import photoDefaultSchema from './schemasPatterns/photoDefault'
import createdSchema from './schemasPatterns/created'

const schema = new mongoose.Schema<IPlate>({
    name: String,
    price: Number,
    photo: {
        type: photoSchema,
        select: false,
        default: photoDefaultSchema
    },
    weight: Number,
    description: String,
    peoplesCount: Number,
    priceConverted: String,
    created: createdSchema
})

const platesModel = mongoose.model('plates', schema)

export default platesModel