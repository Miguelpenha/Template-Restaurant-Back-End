import express from 'express'
import multer from 'multer'
import { photoConfig } from '../../config/multer'
import plates from './plates'
import plate from './plate'
import editPlate from './editPlate'
import deletePlate from './deletePlate'
import createPlate from './createPlate'

const platesRouter = express.Router()
const photoUpload = multer(photoConfig)

platesRouter.get('/', plates)
platesRouter.get('/', plates)
platesRouter.get('/:id', plate)
platesRouter.patch('/:id', editPlate)
platesRouter.delete('/:id', deletePlate)
platesRouter.post('/', photoUpload.single('photo'), createPlate)

export default platesRouter