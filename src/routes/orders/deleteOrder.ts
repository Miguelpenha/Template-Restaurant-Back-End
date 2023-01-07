import { Request, Response } from 'express'
import ordersModel from '../../models/order'

interface IDeleteOrderParams {
    id: string
}

async function deleteOrder(req: Request<IDeleteOrderParams>, res: Response) {
    try {
        await ordersModel.findByIdAndDelete(req.params.id)

        res.json({ deleted: true })
    } catch {
        res.json({ exists: false })
    }
}

export default deleteOrder