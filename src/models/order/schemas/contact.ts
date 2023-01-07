import mongoose from 'mongoose'
import IContact from '../../../types/IOrder/IContact'

const contactSchema = new mongoose.Schema<IContact>({
    email: String,
    telephone: String
})

export default contactSchema