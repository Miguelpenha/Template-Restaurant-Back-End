declare global {
    namespace NodeJS {
      interface ProcessEnv {
        PORT: string
        LOGIN: string
        DOMAIN: string
        PASSWORD: string
        AWS_REGION: string
        SECRET_JWT: string
        ARMAZENAMENTO: string
        PM2_PUBLIC_KEY: string
        PM2_SECRET_KEY: string
        AWS_NAME_BUCKET: string
        URLS_AUTHORIZED: string
        URL_MONGO_TESTE: string
        AWS_ACCESS_KEY_ID: string
        SECRET_KEY_CRYPTO: string
        URL_MONGO_PRODUCAO: string
        API_KEYS_AUTHORIZED: string
        AWS_SECRET_ACCESS_KEY: string
        NODE_ENV: 'production' | 'development'
      }
    }
}

export {}