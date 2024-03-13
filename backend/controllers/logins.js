const express = require('express')
const app = express.Router()
const db = require('../db/models')
const bcrypt = require('bcryptjs')

// retorna lista completa de logins
app.get('/logins', async (requisicao, resposta) => {
    const logins = await db.Logins.findAll({
        attributes: ['id', 'usuario', 'email', 'senha'],
    })
    if (logins) {
        return resposta.json({
            logins,
        })
    } else {
        return resposta.status(400).json({
            mensagem: 'Atenção: Nenhum registro de cliente!'
        })
    }
})

// cadastrar 
app.post('/cadastrarlogin', async (req, res) => {
    var dados = req.body
    dados.senha = await bcrypt.hash(dados.senha, 8)
    await db.Logins.create(dados).then((dadosLogin) => {
        return res.json({
            erro: false,
            mensagem: 'Usuário cadastrado com sucesso!', dadosLogin
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: 'Usuário NÃO cadastrado!'
        })
    })   
})

// login usuario cadastrado
app.post('/login', async (req, res) => {
    const login = await db.Logins.findOne({
        attributes: ['usuario', 'senha'],
        where: {
            usuario: req.body.usuario
        }
    })
    if(login === null){
        return res.status(400).json({
            erro: true,
            mensagem: 'Atenção: Usuário incorreto!'
        })
    }
    if(!(await bcrypt.compare(req.body.senha, login.senha))){
        return res.status(400).json({
            erro: true,
            mensagem: 'Atenção: Senha incorreta!'
        })
    }
    return res.json({
        erro: false,
        mensagem: 'Login realizado com sucesso!'
    })
})

module.exports = app