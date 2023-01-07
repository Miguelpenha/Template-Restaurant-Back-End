import { Request, Response } from 'express'
import ordersModel from '../../models/order'

interface IOrdersQuery {
    list: (string | undefined)
    count: (string | undefined)
    contact: (string | undefined)
    finished: (string | undefined)
    canceled: (string | undefined)
    location: (string | undefined)
    isBeingPrepared: (string | undefined)
}

async function orders(req: Request<{}, {}, {}, IOrdersQuery>, res: Response) {
    const { count, list, location, contact, finished, canceled, isBeingPrepared } = req.query

    if (count !== 'false' && count) {
        res.json({ count: await ordersModel.estimatedDocumentCount() })
    } else {
        const query = {} as { finished?: boolean, canceled?: boolean, isBeingPrepared?: boolean }

        if (finished) {
            query.finished = true
        }

        if (canceled) {
            query.canceled = true
        }

        if (isBeingPrepared) {
            query.isBeingPrepared = true
        }

        const orders = ordersModel.find(query)

        const selects: string[] = []

        if (list !== 'false' && list || location !== 'false' && location || contact !== 'false' && contact) {
            list !== 'false' && list && selects.push('+list')
            location !== 'false' && location && selects.push('+location')
            contact !== 'false' && contact && selects.push('+contact')

            orders.select(selects)
        }

        res.json(await orders)
    }
}

export default orders