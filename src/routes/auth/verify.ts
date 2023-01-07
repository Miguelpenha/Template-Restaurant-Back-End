import { Request, Response } from 'express'
import { decode, verify as verifyJWT, sign } from 'jsonwebtoken'

interface IVerifyBody {
    token: string
}

function verify(req: Request<{}, {}, IVerifyBody>, res: Response) {
    const { token } = req.body
    
    if (token) {
        if (decode(token)) {
            try {
                verifyJWT(token, process.env.SECRET_JWT)
    
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
}

export default verify