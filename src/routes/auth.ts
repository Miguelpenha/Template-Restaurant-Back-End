import express, { Request } from 'express'

const authRouter = express.Router()

authRouter.get('/login', async (req: Request<{}, {}, {
    login: string
    password: string
}, {}>, res) => {
    const { login, password } = req.body

    if (login && login === process.env.LOGIN && password && password === process.env.PASSWORD) {
        res.json({ authenticated: true })
    } else {
        res.json({ authenticated: false })
    }
})

export default authRouter