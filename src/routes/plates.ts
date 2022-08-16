import express, { Request } from 'express'
import platesModel from '../models/plate'
import mongoose from 'mongoose'
import dinero from 'dinero.js'
import multer from 'multer'
import { photoConfig } from '../config/multer'
import { IPlate } from '../types'
import probe from 'probe-image-size'

const platesRouter = express.Router()
const photoUpload = multer(photoConfig)

platesRouter.get('/', async (req: Request<{}, {}, {}, {
    count: (string | undefined)
}>, res) => {
    const { count } = req.query

    if (count !== 'false' && count) {
        res.json({ count: await platesModel.estimatedDocumentCount() })
    } else {
        const plates = await platesModel.find()

        res.json(plates)
    }
})

platesRouter.get('/:id', async(req, res) => {
    const { id } = req.params

    if (mongoose.isValidObjectId(id)) {
        const plateSelect = platesModel.findById(id)

        const plateIsExist= await plateSelect

        if (plateIsExist) {
            res.json(plateIsExist)
        } else {
            res.json({ exists: false })
        }
    } else {
        res.json({ exists: false })
    }
})

platesRouter.post('/', photoUpload.single('photo'), async (req: Request<{}, {}, {
    name: string
    price: string
    weight: number
    description: string
    peoplesCount: number
}>, res) => {
    let { name, price, weight, description, peoplesCount } = req.body

    price.includes(',') ? null : price = `${price},00`
    
    let priceConverted = Number(
        price.replace('.', '')
        .replace(',', '')
        .replace('R$', '')
        .trimStart()
    )

    let photo: IPlate['photo'] = null

    if (req.file) {
        const { location, key, size, originalname, contentType } = req.file as unknown as {           
            location: string
            key: string
            size: number
            originalname: string
            contentType: string
        }

        const { width, height } = await probe(location)

        photo = {
            width,
            height,
            key,
            name: originalname,
            size: Number((size/(1024*1024)).toFixed(2)),
            mimeType: contentType,
            url: location
        }
    }
    
    await platesModel.create({
        name,
        photo,
        price: priceConverted,
        priceConverted: dinero({ amount: priceConverted, currency: 'BRL' }).toFormat(),
        weight,
        description,
        peoplesCount
    })
    
    res.json({ created: true })
})

platesRouter.delete('/', async (req, res) => {
    const plates = await platesModel.find().select('id')
    
    plates.map(async plate => plate.deleteOne())

    res.json({ deleted: true })
})

platesRouter.delete('/:id', async (req: Request<{ id: string }>, res) => {
    try {
        await platesModel.findByIdAndDelete(req.params.id)

        res.json({ deleted: true })
    } catch {
        res.json({ exists: false })
    }
})

platesRouter.patch('/:id', async (req: Request<{ id: string }, {}, {
    name: string
    price: string
    weight: number
    description: string
    peoplesCount: number
}>, res) => {
    const { id: idPlate } = req.params

    if (mongoose.isValidObjectId(idPlate)) {
        const plateEdit = await platesModel.findById(idPlate).select(['id'])

        if (plateEdit) {
            let { name, description, peoplesCount, price, weight } = req.body

            let priceConverted: number

            if (price) {
                price.includes(',') ? null : price = `${price},00`
    
                priceConverted = Number(
                    price.replace('.', '')
                    .replace(',', '')
                    .replace('R$', '')
                    .trimStart()
                )
            }

            await plateEdit.updateOne({
                name,
                description,
                peoplesCount,
                price: priceConverted,
                priceConverted: priceConverted && dinero({ amount: priceConverted, currency: 'BRL' }).toFormat(),
                weight
            })

            res.json({ edited: true })
        } else {
            res.json({ exists: false })
        }
    } else {
        res.json({ exists: false })
    }
})

export default platesRouter