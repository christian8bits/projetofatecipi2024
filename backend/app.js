const express = require('express')
const cors = require('cors')
const porta = 8080
const app = express();
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
const logins = require('./controllers/logins')
const livros = require('./controllers/livros')
app.use('/', clientes)
app.use('/', logins)
app.use('/', livros)

// inicia o servidor na porta
app.listen(porta, () => {
    console.log('Servidor iniciado http://localhost:' + porta)
})
