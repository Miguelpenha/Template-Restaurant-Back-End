import IPlate from '../IPlate'

interface IItemList extends IPlate {
    note: string
    onList?: boolean
    quantity: number
    totalPrice: number
    totalPriceConverted: string
}

export default IItemList