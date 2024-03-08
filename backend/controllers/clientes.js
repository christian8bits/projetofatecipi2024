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

// rota listar clientes
rota.get('/clientes', async (requisicao, resposta) => {
    const { pagina = 1 } = requisicao.query
    console.log(pagina)
    const limite = 10
    var ultimaPagina = 1
    const countCliente = await db.Clientes.count()
    console.log(countCliente)
    if (countCliente !== 0) {
        ultimaPagina = Math.ceil(countCliente / limite)
        console.log(ultimaPagina)
    } else {
        return resposta.status(400).json({
            mensagem: 'Erro: Nenhum usuário encontrado!'
        })
    }
    // recupera usuários do banco de dados
    const clientes = await db.Clientes.findAll({
        attributes: ['id', 'nome', 'cpfcnpj', 'telefone', 'cep', 'logradouro', 'numero','bairro', 'uf', 'cidade' ],
        order: [['id', 'DESC']], // ordenar em descrescente
        // contabilizar limite de registros
        offset: Number((pagina * limite) - limite),
        limite: limite
    })
    // se achar o registro
    if (clientes) {
        var paginacao = {
            path: '/clientes', //caminho
            pagina, // Página atual
            anterior_url: pagina - 1 >= 1 ? pagina - 1 : false,
            proxima_url: Number(pagina) + Number(1) > ultimaPagina ? false : Number(pagina) + Number(1),
            ultimaPagina,
            total: countCliente
        }
        return resposta.json({
            clientes,
            paginacao
        })
    } else {
        return resposta.status(400).json({
            mensagem: 'Erro: Nenhum registro de cliente encontrado!'
        })
    }
}) 

// rota detalhes cliente ex: http://localhost:8080/cliente/1
rota.get('/cliente/:id', async (requisicao, resposta) => {
    const { id } = requisicao.params
    console.log(id)

    const cliente = await db.Clientes.findOne({
        attributes:  ['id', 'nome', 'cpfcnpj', 'telefone', 'cep', 'logradouro', 'numero','bairro', 'uf', 'cidade', 'createdAt', 'updatedAt'],
        where: { id },
    })
    console.log(cliente)

    if (cliente) {
        return resposta.json({
            cliente: cliente.dataValues
        })
    } else {
        return resposta.status(400).json({
            mensagem: 'Erro: Cliente NÃO encontrado !'
        })
    }
})


module.exports = rota