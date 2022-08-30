export interface ICreated {
    date: String
    hour: String
    system: Date
}

export interface IPlate {
    _id: string
    name: string
    price: number
    photo: {
        name: string
        key: string
        size: number
        mimeType: string
        url: string
        width: number
        height: number
    }
    weight: number
    description: string
    peoplesCount: number
    priceConverted: string
    created: ICreated
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
    created: ICreated
    list: IItemList[]
    finished?: boolean
    location: ILocation
    withdrawal: boolean
    methodOfPayment: string
    balanceConverted: string
}

export interface ILocation {
    city: string // Cidade
    neighborhood: string // Bairro
    street: string // Rua
    complement: string // Complemento do endereço
    number: string // Número da casa
}