const createdSchema = {
    date: {
        type: String,
        default: () => new Date().toLocaleDateString()
    },
    hour: {
        type: String,
        default: () => new Date().toLocaleTimeString('pt-br', {
            timeStyle: 'short'
        })
    },
    system: {
        type: Date,
        default: () => new Date()
    }
}

export default createdSchema