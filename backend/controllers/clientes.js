const  express = require('express')
const rota = express.Router()

const db = require('./../db/models')


rota.post('/clientes', async (requisicao, resposta) => {

    var dados = requisicao.body
    console.log(dados)

    await db.Clientes.create(dados).then((dadosCliente) => {
        return resposta.json({
            mensagem: 'Cliente acessado!', dadosCliente
        })
    })

    

 
})

module.exports = rota