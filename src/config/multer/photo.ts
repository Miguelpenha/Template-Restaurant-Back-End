import multer from 'multer'
import path from 'path'
import crypto from 'crypto'
import fs from 'fs'
import multerS3 from 'multer-s3'
import { S3Client } from '@aws-sdk/client-s3'

const storageS3 = new S3Client({  })

const storagesTypes = {
    local: multer.diskStorage({
        destination:(req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', '..', '..', 'public', 'plates', 'photos'))
        },
        filename: (req, file, cb) => {
            function gerarHash() {
                let hash = crypto.randomBytes(4).toString('hex')

                if (fs.readdirSync(path.resolve(__dirname, '..', '..', '..', '..', 'public', 'plates', 'photos')).includes(`${hash}-${file.originalname}`)) {
                    gerarHash()
                } else {
                    return hash
                }
            }
            
            file.filename = `${gerarHash()}-${file.originalname.replace(/\s+/g, '-')}`
            
            cb(null, file.filename)
        }
    }),
    s3: multerS3({
        s3: storageS3,
        bucket: process.env.AWS_NAME_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        acl: 'public-read',
        key: (req, file, cb) => {
            const fileName = `plates/photos/${crypto.randomBytes(4).toString('hex')}-${file.originalname.replace(/\s+/g, '-')}`

            cb(null, fileName)
        },
        serverSideEncryption: 'AES256'
    })
}

const photoConfig: multer.Options = {
    dest: path.resolve(__dirname, '..', '..', '..', '..', 'public', 'plates', 'photos'),
    storage: storagesTypes[process.env.ARMAZENAMENTO],
    limits: {
        fileSize: 100 * 1024 * 1024
    },
    fileFilter: (req, file, cb) => {
        const mimes = [
            'image/png', 
            'image/jpeg', 
            'image/bmp', 
            'image/webp',
            'image/gif',
            'image/psd',
            'image/tiff',
            'image/jp2',
            'image/iff',
            'image/vnd.wap.wbmp',
            'image/xbm',
            'image/vnd.microsoft.icon',
            'image/cis-cod',
            'image/ief',
            'image/pipeg',
            'image/svg+xml',
            'image/x-cmu-raster',
            'image/x-cmx',
            'image/x-icon',
            'image/x-portable-anymap',
            'image/x-portable-bitmap',
            'image/x-portable-graymap',
            'image/x-portable-pixmap',
            'image/x-rgb',
            'image/x-xbitmap',
            'image/x-xpixmap',
            'image/x-xwindowdump',
            'application/x-shockwave-flash',
            'application/octet-stream'
        ]

        if (mimes.includes(file.mimetype)) {
            cb(null, true)
        } else {
            cb(null)
        }
    }
}

export default photoConfig