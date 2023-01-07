import { Request, Response } from 'express'
import { sign } from 'jsonwebtoken'

interface ILoginBody {
    login: string
    password: string
}

function login(req: Request<{}, {}, ILoginBody>, res: Response) {
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
}

export default login