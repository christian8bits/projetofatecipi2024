const express = require('express')
const db = require('./db/models')
const app = express()
const porta = 8080

//criar middleware que recebe dados da requisicao 
app.use(express.json()) // indica formato dos dados em json


const clientes = require('./controllers/clientes')
app.use('/', clientes)


// inicia o servidor na porta
app.listen(porta, () => {
    console.log('Servidor iniciado http://localhost:'+porta)
})