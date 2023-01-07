import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import cors from 'cors'
import dinero from 'dinero.js'
import urlMongo from './config/db'
import routes from './routes'
import port from './config/port'
import pathPublicFolder from './config/pathPublicFolder'
import { greenBright as success } from 'chalk'
import helmet from 'helmet'

const app = express()

app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))

console.log(success('>> Helmet sendo usado'))

mongoose.connect(urlMongo)

app.set('trust proxy', 1)
app.disable('x-powered-by')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(morgan('dev'))
app.use(cors({
    origin: process.env.URLS_AUTHORIZED,
    credentials: true,
    optionsSuccessStatus: 200
}))

dinero.globalLocale = 'pt-br'

app.use('/public', express.static(pathPublicFolder))
app.use('/', routes)

app.use((req, res) => res.status(404))

app.listen(port, () => {
    console.log(success('>> Servidor Rodando'))
    console.log(success(`   >> ${process.env.NODE_ENV === 'production' ? process.env.DOMAIN : `http://localhost:${port}`}`))
})