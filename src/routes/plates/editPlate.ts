import { Request, Response } from 'express'
import mongoose from 'mongoose'
import platesModel from '../../models/plate'
import dinero from 'dinero.js'

interface IEditPlateParams {
    id: string
}

interface IEditPlateBody {
    name: string
    price: string
    weight: number
    description: string
    peoplesCount: number
}

async function editPlate(req: Request<IEditPlateParams, {}, IEditPlateBody>, res: Response) {
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
}

export default editPlate