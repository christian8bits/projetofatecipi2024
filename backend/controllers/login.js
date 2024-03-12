const express = require('express')
const app = express()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { eAdmin } = require('./middlewares/auth')
const User = require('./models/Login')

app.use(express.json())

app.get('/login', eAdmin, async (req, res) => {
    await Login.findAll({
        attributes: ['id', 'usuario'],
        order: [['id', 'DESC']]
    })
    .then((login) => {
        return res.json({
            erro: false,
            login,
            id_usuario_logado: req.userId
        })
    }).catch(() => {
        return res.status(400).json({
            erro: true,
            mensagem: 'Erro: Nenhum usuário encontrado!'
        })
    })
})

app.post('/cadastrarlogin', async (req, res) => {
    var dados = req.body
    const senhateste = await bcrypt.hash("4321abcd", 8)

    console.log(senhateste)

    //dados.senha = await bcrypt.hash(dados.senha, 8)

    return res.json({
        erro: false,
        mensagem: 'Usuário cadastrado com sucesso!'
    })
})

app.post('/login', async (req, res) => {

    const login = await Login.findOne({
        attributes: ['id', 'usuario', 'senha'],
        where: {
            usuario: req.body.usuario
        }
    })

    if(login === null){
        return res.status(400).json({
            erro: true,
            mensagem: 'Erro: Usuário ou a senha incorreta! Nenhum usuário com este e-mail'
        })
    }

    if(!(await bcrypt.compare(req.body.password, login.password))){
        return res.status(400).json({
            erro: true,
            mensagem: 'Erro: Usuário ou a senha incorreta! Senha incorreta!'
        })
    }

    var token = jwt.sign({id: login.id}, 'D62ST92Y7A6V7K5C6W9ZU6W8KS3', {
        //expiresIn: 600 //10 min
        //expiresIn: 60 //1 min
        expiresIn: '1d' // 1 dia
    })

    return res.json({
        erro: false,
        mensagem: 'Login realizado com sucesso!',
        token
    })
})

app.listen(8080, () => {
    console.log('Servidor iniciado na porta 8080: http://localhost:8080')
})