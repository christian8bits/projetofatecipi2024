const express = require('express')
const app = express.Router()
const db = require('./../db/models')

// rota cadastrar cliente em http://localhost:8080/clientes
app.post('/clientes', async (requisicao, resposta) => {
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

// rota listar clientes http://localhost:8080/clientes
app.get('/clientes', async (requisicao, resposta) => {
    const { pagina = 1 } = requisicao.query
    console.log(pagina)
    const limit = 10
    var ultimaPagina = 1
    const countCliente = await db.Clientes.count()
    console.log(countCliente)
    if (countCliente !== 0) {
        ultimaPagina = Math.ceil(countCliente / limit)
        console.log(ultimaPagina)
    } else {
        return resposta.status(400).json({
            mensagem: 'Atenção: Nenhum cliente registrado!'
        })
    }
    // recupera usuários do banco de dados
    const clientes = await db.Clientes.findAll({
        attributes: ['id', 'nome', 'email', 'cpfcnpj', 'telefone', 'cep', 'logradouro', 'numero', 'bairro', 'complemento', 'uf', 'cidade'],
        order: [['id', 'ASC']],
        // contabilizar limit de registros
        offset: Number((pagina * limit) - limit),
        limit: limit
    })
    if (clientes) {
        var paginacao = {
            path: '/clientes', 
            pagina, // página atual 
            pagina_anterior: pagina - 1 >= 1 ? pagina - 1 : false,
            prox_pagina: Number(pagina) + Number(1) > ultimaPagina ? false : Number(pagina) + Number(1),
            ultimaPagina,
            total: countCliente
        }
        return resposta.json({
            clientes,
            paginacao
        })
    } else {
        return resposta.status(400).json({
            mensagem: 'Atenção: Nenhum cliente registrado!'
        })
    }
})

// rota detalhes cliente ex: http://localhost:8080/cliente/1
app.get('/cliente/:id', async (requisicao, resposta) => {
    const { id } = requisicao.params
    console.log(id)
    const cliente = await db.Clientes.findOne({
        attributes: ['id', 'nome', 'email', 'cpfcnpj', 'telefone', 'cep', 'logradouro', 'numero', 'bairro', 'complemento', 'uf', 'cidade', 'createdAt', 'updatedAt'],
        where: { id },
    })
    console.log(cliente)
    if (cliente) {
        return resposta.json({
            cliente: cliente.dataValues
        })
    } else {
        return resposta.status(400).json({
            mensagem: 'Erro: Cliente NÃO encontrado!'
        })
    }
})
// rota editar 
app.put('/clientes', async (requisicao, resposta) => {
    var dados = requisicao.body
    await db.Clientes.update(dados, { where: { id: dados.id } })
        .then(() => {
            return resposta.json({
                mensagem: 'Cliente atualizado!'
            })
        }).catch(() => {
            return resposta.status(400).json({
                mensagem: 'Erro: Cliente NÃO atualizado!'
            })
        })
})

// rota apagar ex: http://localhost:8080/clientes/1
app.delete('/clientes/:id', async (requisicao, resposta) => {
    const { id } = requisicao.params
    await db.Clientes.destroy({
        where: { id }
    }).then(() => {
        return resposta.json({
            mensagem: 'Cliente deletado!'
        })
    }).catch(() => {
        return resposta.status(400).json({
            mensagem: "Erro: Cliente NÃO deletado!"
        })
    })
})
module.exports = app