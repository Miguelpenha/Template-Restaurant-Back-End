import mongoose from 'mongoose'
import { IContact } from '../../../types'

const contactSchema = new mongoose.Schema<IContact>({
    email: String,
    telephone: String
})

export default contactSchema