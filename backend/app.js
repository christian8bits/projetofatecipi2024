const express = require('express')
const cors = require('cors')
//const db = require('./db/models')
const app = express()
const porta = 8080

//criar middleware que recebe dados da requisicao 
app.use(express.json()) // indica formato dos dados em json

app.use((requisicao, resposta, next) => {
    resposta.header('Access-Control-Allow-Origin', '*')
    resposta.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE')
    resposta.header('Access-Control-Allow-Headers', 'Content-Type')
    app.use(cors())
    next()
})

const clientes = require('./controllers/clientes')
app.use('/', clientes)
const logins = require('./controllers/logins')
app.use('/', clientes)
app.use('/', logins)


// inicia o servidor na porta
app.listen(porta, () => {
    console.log('Servidor iniciado http://localhost:' + porta)
})