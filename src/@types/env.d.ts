declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: string
        DOMAIN: string
        ARMAZENAMENTO: string
        LOGIN: string
        PASSWORD: string
        URLS_AUTHORIZED: string
        API_KEYS_AUTHORIZED: string
        URL_MONGO_TESTE: string
        URL_MONGO_PRODUCAO: string
        SECRET_KEY_CRYPTO: string
        SECRET_JWT: string
        PM2_PUBLIC_KEY: string
        PM2_SECRET_KEY: string
        AWS_ACCESS_KEY_ID: string
        AWS_SECRET_ACCESS_KEY: string
        AWS_REGION: string
        AWS_NAME_BUCKET: string
        NODE_ENV: 'production' | 'development'
      }
    }
}

export {}