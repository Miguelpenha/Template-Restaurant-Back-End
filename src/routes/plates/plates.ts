import { Request, Response } from 'express'
import platesModel from '../../models/plate'

interface IPlatesQuery {
    count: (string | undefined)
    photo: (string | undefined)
}

async function plates(req: Request<{}, {}, {}, IPlatesQuery>, res: Response) {
    const { count, photo } = req.query

    if (count !== 'false' && count) {
        res.json({ count: await platesModel.estimatedDocumentCount() })
    } else {
        const plates = platesModel.find()
        const selects: string[] = []

        if (photo !== 'false' && photo) {
            photo !== 'false' && photo && selects.push('+photo')

            plates.select(selects)
        }

        res.json(await plates)
    }
}

export default plates