const createdSchema = {
    system: {
        type: Date,
        default: () => new Date()
    },
    date: {
        type: String,
        default: () => new Date().toLocaleDateString('pt-br')
    },
    hour: {
        type: String,
        default: () => new Date().toLocaleTimeString('pt-br', {
            timeStyle: 'short'
        })
    }
}

export default createdSchema