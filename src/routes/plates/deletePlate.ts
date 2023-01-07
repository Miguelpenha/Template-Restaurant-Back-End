import { Request, Response } from 'express'
import platesModel from '../../models/plate'

interface IDeletePlateParams {
    id: string
}

async function deletePlate(req: Request<IDeletePlateParams>, res: Response) {
    try {
        await platesModel.findByIdAndDelete(req.params.id)

        res.json({ deleted: true })
    } catch {
        res.json({ exists: false })
    }
}

export default deletePlate