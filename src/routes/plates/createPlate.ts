import { Request, Response } from 'express'
import { IPlate } from '../../types'
import probe from 'probe-image-size'
import platesModel from '../../models/plate'
import dinero from 'dinero.js'

interface ICreatePlateBody {
    name: string
    price: string
    weight: number
    description: string
    peoplesCount: number
}

async function createPlate(req: Request<{}, {}, ICreatePlateBody>, res: Response) {
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
        photo: photo || undefined,
        price: priceConverted,
        priceConverted: dinero({ amount: priceConverted, currency: 'BRL' }).toFormat(),
        weight,
        description,
        peoplesCount
    })
    
    res.json({ created: true })
}

export default createPlate