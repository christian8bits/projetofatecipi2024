const express = require('express')
const app = express()
const porta = 8080

const clientes = require('./controllers/clientes')
app.use('/', clientes)

// inicia o servidor na porta
app.listen(porta, () => {
    console.log('Servidor iniciado http://localhost:'+porta)
})