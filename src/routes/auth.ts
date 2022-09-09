import express, { Request } from 'express'
import { sign, verify, decode } from 'jsonwebtoken'

const authRouter = express.Router()

authRouter.post('/login', async (req: Request<{}, {}, {
    login: string
    password: string
}, {}>, res) => {
    const { login, password } = req.body

    if (login && login === process.env.LOGIN && password && password === process.env.PASSWORD) {
        const token = sign({}, process.env.SECRET_JWT, {
            subject: 'true',
            expiresIn: '20s'
        })
        
        res.json({ authenticated: true, token })
    } else {
        res.json({ authenticated: false })
    }
})

authRouter.post('/verify', async (req: Request<{}, {}, {
    token: string
}, {}>, res) => {
    const { token } = req.body
    
    if (token) {
        if (decode(token)) {
            try {
                verify(token, process.env.SECRET_JWT)
    
                res.json({ verified: true })
            } catch {
                const newToken = sign({}, process.env.SECRET_JWT, {
                    subject: 'true',
                    expiresIn: '20s'
                })
    
                res.json({ newToken })
            }
        } else {
            res.json({ tokenInvalid: true })
        }
    } else {
        res.json({ tokenNotFound: true })
    }
})

export default authRouter