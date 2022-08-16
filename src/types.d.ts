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