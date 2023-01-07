import mongoose from 'mongoose'
import ILocation from '../../../types/IOrder/ILocation'

const locationSchema = new mongoose.Schema<ILocation>({
    city: String,
    number: String,
    street: String,
    complement: String,
    neighborhood: String
})

export default locationSchema