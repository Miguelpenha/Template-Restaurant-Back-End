import ICreated from './ICreated'
import IItemList from './IItemList'
import IContact from './IContact'
import ILocation from './ILocation'

interface IOrder {
    _id: string
    note: string
    balance: number
    nameUser: string
    created: ICreated
    list: IItemList[]
    contact: IContact
    canceled?: boolean
    finished?: boolean
    location: ILocation
    withdrawal: boolean
    methodOfPayment: string
    balanceConverted: string
    isBeingPrepared?: boolean
}

export default IOrder