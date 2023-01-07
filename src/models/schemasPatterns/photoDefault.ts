import fs from 'fs'
import path from 'path'

const photoDefaultSchema = {
    width: 500,
    height: 500,
    key: 'Padrão.jpg',
    name: 'Padrão.jpg',
    mimeType: 'image/jpeg',
    url: `${process.env.DOMAIN}/public/Padrão.jpg`,
    size: Number((fs.statSync(path.resolve(__dirname, '..', '..', '..', 'public', 'Padrão.jpg')).size/(1024*1024)).toFixed(2)),
}

export default photoDefaultSchema