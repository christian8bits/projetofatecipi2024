const express = require('express')
const app = express.Router()
const db = require('./../db/models')


// rota cadastrar pedido em http://localhost:8080/pedidos
app.post('/pedidos', async (requisicao, resposta) => {
    var dados = requisicao.body
    console.log(dados)
    await db.Pedidos.create(dados).then((dadosPedido) => {
        return resposta.json({
            mensagem: 'Pedido Cadastrado!', dadosPedido
        })
    }).catch(() => {
        return resposta.status(400).json({
            mensagem: 'Pedido NÃO Cadastrado!'
        })
    })
})



// rota cadastrar planilha em http://localhost:8080/pedidos
app.post('/pedidosplanilha', async (requisicao, resposta) => {
    var dados = requisicao.body
    console.log(dados[3])
        await db.Pedidos.bulkCreate(dados).then((dadosPedido) => {
            return resposta.json({
                mensagem: 'Pedido Cadastrado!', dadosPedido
            })
        }).catch(() => {
            return resposta.status(400).json({
                mensagem: 'Pedido NÃO Cadastrado!'
            })
        })

})


app.get('/pedidosTodos', async (requisicao, resposta) => {
    const { pagina = 1 } = requisicao.query
    console.log(pagina)
    const limit = 100000
    var ultimaPagina = 1
    const countPedido = await db.Pedidos.count()
    console.log(countPedido)
    if (countPedido !== 0) {
        ultimaPagina = Math.ceil(countPedido / limit)
        console.log(ultimaPagina)
    } else {
        return resposta.status(400).json({
            mensagem: 'Atenção: Nenhum pedido registrado!'
        })
    }
    // recupera usuários do banco de dados
    const pedidos = await db.Pedidos.findAll({
        attributes: ['id', 'data', 'pedido', 'codigoev', 'comprador', 'cpfcnpj', 'destinatario', 'logradouro', 'numero', 'complemento', 'bairro', 'estado', 'cidade', 'cep', 'formaenvio', 'codigorastreio'],
        order: [['id', 'ASC']],
        // contabilizar limit de registros
        offset: Number((pagina * limit) - limit),
        limit: limit
    })
    if (pedidos) {
        var paginacao = {
            path: '/pedidos',
            pagina, // página atual 
            pagina_anterior: pagina - 1 >= 1 ? pagina - 1 : false,
            prox_pagina: Number(pagina) + Number(1) > ultimaPagina ? false : Number(pagina) + Number(1),
            ultimaPagina,
            total: countPedido
        }
        return resposta.json({
            pedidos,
            paginacao
        })
    } else {
        return resposta.status(400).json({
            mensagem: 'Atenção: Nenhum pedido registrado!'
        })
    }
})





// rota listar pedidos http://localhost:8080/pedidos
app.get('/pedidos', async (requisicao, resposta) => {
    const { pagina = 1 } = requisicao.query
    console.log(pagina)
    const limit = 10
    var ultimaPagina = 1
    const countPedido = await db.Pedidos.count()
    console.log(countPedido)
    if (countPedido !== 0) {
        ultimaPagina = Math.ceil(countPedido / limit)
        console.log(ultimaPagina)
    } else {
        return resposta.status(400).json({
            mensagem: 'Atenção: Nenhum pedido registrado!'
        })
    }
    // recupera usuários do banco de dados
    const pedidos = ['id', 'data', 'pedido', 'codigoev', 'comprador', 'cpfcnpj', 'destinatario', 'logradouro', 'numero', 'complemento', 'bairro', 'estado', 'cidade', 'cep', 'formaenvio', 'codigorastreio'],
        order: [['id', 'ASC']],
        // contabilizar limit de registros
        offset: Number((pagina * limit) - limit),
        limit: limit
    })
    if (pedidos) {
        var paginacao = {
            path: '/pedidos',
            pagina, // página atual 
            pagina_anterior: pagina - 1 >= 1 ? pagina - 1 : false,
            prox_pagina: Number(pagina) + Number(1) > ultimaPagina ? false : Number(pagina) + Number(1),
            ultimaPagina,
            total: countPedido
        }
        return resposta.json({
            pedidos,
            paginacao
        })
    } else {
        return resposta.status(400).json({
            mensagem: 'Atenção: Nenhum pedido registrado!'
        })
    }
})

// rota detalhes pedido ex: http://localhost:8080/pedido/1
app.get('/pedido/:id', async (requisicao, resposta) => {
    const { id } = requisicao.params
    console.log(id)
    const pedido = await db.Pedidos.findOne({
        attributes: ['id', 'data', 'pedido', 'codigoev', 'comprador', 'cpfcnpj', 'destinatario', 'logradouro', 'numero', 'complemento', 'bairro', 'estado', 'cidade', 'cep', 'formaenvio', 'codigorastreio', 'createdAt', 'updatedAt'],
        where: { id },
    })
    console.log(pedido)
    if (pedido) {
        return resposta.json({
            pedido: pedido.dataValues
        })
    } else {
        return resposta.status(400).json({
            mensagem: 'Erro: Pedido NÃO encontrado!'
        })
    }
})
// rota editar 
app.put('/pedidos', async (requisicao, resposta) => {
    var dados = requisicao.body
    await db.Pedidos.update(dados, { where: { id: dados.id } })
        .then(() => {
            return resposta.json({
                mensagem: 'Pedido atualizado!'
            })
        }).catch(() => {
            return resposta.status(400).json({
                mensagem: 'Erro: Pedido NÃO atualizado!'
            })
        })
})

// rota apagar ex: http://localhost:8080/pedidos/1
app.delete('/pedidos/:id', async (requisicao, resposta) => {
    const { id } = requisicao.params
    await db.Pedidos.destroy({
        where: { id }
    }).then(() => {
        return resposta.json({
            mensagem: 'Pedido deletado!'
        })
    }).catch(() => {
        return resposta.status(400).json({
            mensagem: "Erro: Pedido NÃO deletado!"
        })
    })
})
module.exports = app
