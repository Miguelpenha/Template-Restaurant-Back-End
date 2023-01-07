export interface ICreated {
    date: String
    hour: String
    system: Date
}

export interface IPlate {
    _id: string
    name: string
    price: number
    weight: number
    created: ICreated
    description: string
    peoplesCount: number
    priceConverted: string
    photo: {
        name: string
        key: string
        size: number
        mimeType: string
        url: string
        width: number
        height: number
    }
}

export interface IItemList extends IPlate {
    note: string
    onList?: boolean
    quantity: number
    totalPrice: number
    totalPriceConverted: string
}

export interface IOrder {
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

export interface ILocation {
    city: string
    number: string
    street: string
    complement: string 
    neighborhood: string
}

export interface IContact {
    email?: string
    telephone: string
}