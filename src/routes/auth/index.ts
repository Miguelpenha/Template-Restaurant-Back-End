import express from 'express'
import login from './login'
import verify from './verify'

const authRouter = express.Router()

authRouter.post('/login', login)
authRouter.post('/verify', verify)

export default authRouter