import fs from 'fs'
import path from 'path'

const photoDefaultSchema = {
    name: 'Padrão.jpg',
    key: 'Padrão.jpg',
    size: Number((fs.statSync(path.resolve(__dirname, '..', '..', '..', 'public', 'Padrão.jpg')).size/(1024*1024)).toFixed(2)),
    mimeType: 'image/jpeg',
    url: `${process.env.DOMINIO}/public/Padrão.jpg`,
    width: 500,
    height: 500
}

export default photoDefaultSchema