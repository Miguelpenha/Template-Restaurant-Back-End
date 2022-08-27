import mongoose from 'mongoose'
import { IPlate } from '../types'
import photoSchema from './schemasPatterns/photo'
import fs from 'fs'
import path from 'path'
import createdSchema from './schemasPatterns/created'

const schema = new mongoose.Schema<IPlate>({
    name: String,
    price: Number,
    photo: {
        type: photoSchema,
        select: false,
        default: {
            name: 'Padrão.jpg',
            key: 'Padrão.jpg',
            size: Number((fs.statSync(path.resolve(__dirname, '..', '..', 'public', 'Padrão.jpg')).size/(1024*1024)).toFixed(2)),
            mimeType: 'image/jpeg',
            url: `${process.env.DOMINIO}/public/Padrão.jpg`,
            width: 500,
            height: 500
        }
    },
    weight: Number,
    description: String,
    peoplesCount: Number,
    priceConverted: String,
    created: createdSchema
})

const platesModel = mongoose.model('plates', schema)

export default platesModel