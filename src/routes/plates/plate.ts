import { Request, Response } from 'express'
import mongoose from 'mongoose'
import platesModel from '../../models/plate'

interface IPlateParams {
    id: string
}

async function plate(req: Request<IPlateParams>, res: Response) {
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
}

export default plate