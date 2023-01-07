import { greenBright as success } from 'chalk'

const port = process.env.PORT

if (process.env.NODE_ENV === 'production') {
    console.log(success('> Usando a porta de produção'))
} else {
    console.log(success('>> Usando a porta de teste'))
}

export default port