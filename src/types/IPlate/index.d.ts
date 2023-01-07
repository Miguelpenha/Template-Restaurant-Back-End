import IPhoto from './IPhoto'
import ICreated from './ICreated'

interface IPlate {
    _id: string
    name: string
    price: number
    photo: IPhoto
    weight: number
    created: ICreated
    description: string
    peoplesCount: number
    priceConverted: string
}

export default IPlate