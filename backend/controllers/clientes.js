const  express = require('express')
const rota = express.Router()

rota.post('/clientes', async (requisicao, resposta) =>{
    return resposta.json({
        mensagem: 'Cliente acessado!'
    })
})

module.exports = rota