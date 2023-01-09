import crypto from 'crypto'

function encrypt(data: string) {
    if (data) {
        const iv = crypto.randomBytes(12)
        const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(process.env.SECRET_KEY_CRYPTO), iv)
        let crip = cipher.update(data, 'utf8', 'hex')

        crip += cipher.final('hex')
        
        const tag = cipher.getAuthTag().toString('hex')

        return `${crip}:${iv.toString('hex')}:${tag}`
    } else {
        return undefined
    }
}

export default encrypt