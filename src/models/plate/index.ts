import mongoose from 'mongoose'
import { IPlate } from '../../types'
import photoSchema from './schemas/photo'
import created from '../schemasPatterns/created'

const schema = new mongoose.Schema<IPlate>({
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
    created
})

const platesModel = mongoose.model('plates', schema)

export default platesModel