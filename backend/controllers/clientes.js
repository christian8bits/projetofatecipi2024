const  express = require('express')
const rota = express.Router()
const db = require('./../db/models')

// rota cadastrar cliente em http://localhost:8080/clientes
rota.post('/clientes', async (requisicao, resposta) => {
    var dados = requisicao.body
    console.log(dados)
    await db.Clientes.create(dados).then((dadosCliente) => {
        return resposta.json({
            mensagem: 'Cliente Cadastrado!', dadosCliente
        })
    }).catch(() => {
        return resposta.status(400).json({
            mensagem: 'Cliente NÃO Cadastrado!'
        })
    })
})
module.exports = rota