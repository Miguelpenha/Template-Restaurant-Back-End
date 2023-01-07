import { Request, Response } from 'express'
import platesModel from '../../models/plate'

async function deletePlates(req: Request, res: Response) {
    const plates = await platesModel.find().select('id')
    
    plates.map(plate => plate.deleteOne())

    res.json({ deleted: true })
}

export default deletePlates