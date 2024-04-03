const express = require('express')
const app = express.Router()
const db = require('./../db/models')


// rota cadastrar livro em http://localhost:8080/livros
app.post('/livros', async (requisicao, resposta) => {
    var dados = requisicao.body
    console.log(dados)
    await db.Livros.create(dados).then((dadosLivro) => {
        return resposta.json({
            mensagem: 'Livro Cadastrado!', dadosLivro
        })
    }).catch(() => {
        return resposta.status(400).json({
            mensagem: 'Livro NÃO Cadastrado!'
        })
    })
})



// rota cadastrar planilha em http://localhost:8080/livros
app.post('/livrosplanilha', async (requisicao, resposta) => {
    var dados = requisicao.body
    console.log(dados[3])
    console.log("Livro testado")
        await db.Livros.bulkCreate(dados).then((dadosLivro) => {
            return resposta.json({
                mensagem: 'Livro Cadastrado!', dadosLivro
            })
        }).catch(() => {
            return resposta.status(400).json({
                mensagem: 'Livro NÃO Cadastrado!'
            })
        })

})


app.get('/livrosTodos', async (requisicao, resposta) => {
    const { pagina = 1 } = requisicao.query
    console.log(pagina)
    const limit = 100000
    var ultimaPagina = 1
    const countLivro = await db.Livros.count()
    console.log(countLivro)
    if (countLivro !== 0) {
        ultimaPagina = Math.ceil(countLivro / limit)
        console.log(ultimaPagina)
    } else {
        return resposta.status(400).json({
            mensagem: 'Atenção: Nenhum livro registrado!'
        })
    }
    // recupera usuários do banco de dados
    const livros = await db.Livros.findAll({
        attributes: ['id', 'isbn', 'autor', 'titulo', 'tipolivro', 'idioma', 'estante', 'editora', 'ano', 'preco', 'edicao', 'peso', 'descricao', 'categoria', 'localizacao'],
        order: [['id', 'ASC']],
        // contabilizar limit de registros
        offset: Number((pagina * limit) - limit),
        limit: limit
    })
    if (livros) {
        var paginacao = {
            path: '/livros',
            pagina, // página atual 
            pagina_anterior: pagina - 1 >= 1 ? pagina - 1 : false,
            prox_pagina: Number(pagina) + Number(1) > ultimaPagina ? false : Number(pagina) + Number(1),
            ultimaPagina,
            total: countLivro
        }
        return resposta.json({
            livros,
            paginacao
        })
    } else {
        return resposta.status(400).json({
            mensagem: 'Atenção: Nenhum livro registrado!'
        })
    }
})





// rota listar livros http://localhost:8080/livros
app.get('/livros', async (requisicao, resposta) => {
    const { pagina = 1 } = requisicao.query
    console.log(pagina)
    const limit = 10
    var ultimaPagina = 1
    const countLivro = await db.Livros.count()
    console.log(countLivro)
    if (countLivro !== 0) {
        ultimaPagina = Math.ceil(countLivro / limit)
        console.log(ultimaPagina)
    } else {
        return resposta.status(400).json({
            mensagem: 'Atenção: Nenhum livro registrado!'
        })
    }
    // recupera usuários do banco de dados
    const livros = await db.Livros.findAll({
        attributes: ['id', 'isbn', 'autor', 'titulo', 'tipolivro', 'idioma', 'estante', 'editora', 'ano', 'preco', 'edicao', 'peso', 'descricao', 'categoria', 'localizacao'],
        order: [['id', 'ASC']],
        // contabilizar limit de registros
        offset: Number((pagina * limit) - limit),
        limit: limit
    })
    if (livros) {
        var paginacao = {
            path: '/livros',
            pagina, // página atual 
            pagina_anterior: pagina - 1 >= 1 ? pagina - 1 : false,
            prox_pagina: Number(pagina) + Number(1) > ultimaPagina ? false : Number(pagina) + Number(1),
            ultimaPagina,
            total: countLivro
        }
        return resposta.json({
            livros,
            paginacao
        })
    } else {
        return resposta.status(400).json({
            mensagem: 'Atenção: Nenhum livro registrado!'
        })
    }
})

// rota detalhes livro ex: http://localhost:8080/livro/1
app.get('/livro/:id', async (requisicao, resposta) => {
    const { id } = requisicao.params
    console.log(id)
    const livro = await db.Livros.findOne({
        attributes: ['id', 'isbn', 'autor', 'titulo', 'tipolivro', 'idioma', 'estante', 'editora', 'ano', 'preco', 'edicao', 'peso', 'descricao', 'categoria', 'localizacao', 'createdAt', 'updatedAt'],
        where: { id },
    })
    console.log(livro)
    if (livro) {
        return resposta.json({
            livro: livro.dataValues
        })
    } else {
        return resposta.status(400).json({
            mensagem: 'Erro: Livro NÃO encontrado!'
        })
    }
})
// rota editar 
app.put('/livros', async (requisicao, resposta) => {
    var dados = requisicao.body
    await db.Livros.update(dados, { where: { id: dados.id } })
        .then(() => {
            return resposta.json({
                mensagem: 'Livro atualizado!'
            })
        }).catch(() => {
            return resposta.status(400).json({
                mensagem: 'Erro: Livro NÃO atualizado!'
            })
        })
})

// rota apagar ex: http://localhost:8080/livros/1
app.delete('/livros/:id', async (requisicao, resposta) => {
    const { id } = requisicao.params
    await db.Livros.destroy({
        where: { id }
    }).then(() => {
        return resposta.json({
            mensagem: 'Livro deletado!'
        })
    }).catch(() => {
        return resposta.status(400).json({
            mensagem: "Erro: Livro NÃO deletado!"
        })
    })
})
module.exports = app