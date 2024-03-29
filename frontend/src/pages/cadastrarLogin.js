import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function Login() {
  const [data, setData] = useState({
    usuario: '',
    email: '',
    senha: ''
  })



  const [mensagem, setMessage] = useState('')
  const valueInput = (e) => setData({ ...data, [e.target.name]: e.target.value })

  const cadastrarLogin = async (e) => {
    e.preventDefault()
    const headers = {
      'headers': {
        'Content-Type': 'application/json'
      }
    }
    await axios.post('http://localhost:8080/cadastrarlogin', data, headers)
      .then((response) => {
        setMessage(response.data.mensagem)
        setData({
          usuario: '',
          email: '',
          senha: ''
        })


      }).catch((err) => {
        if (err.response) {
          setMessage(err.response.data.mensagem)
        } else {
          setMessage('Erro: Tente novamente mais tarde ou solicite ajuda ao suporte!')
        }
      })
  }

  return (
    <>
      <Head>
        <title>Monitora Entregas</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
          <h2>Cadastro Novo Login</h2>
          {mensagem ? <p>{mensagem}</p> : ''}

            <form onSubmit={cadastrarLogin}>
              <label>Usuário: </label>
              <input type='text' name='usuario' placeholder='Usuário de acesso' onChange={valueInput} value={data.usuario} /><br /><br />
              <label>E-mail: </label>
              <input type='text' name='email' placeholder='E-mail para recuperação' onChange={valueInput} value={data.email} /><br /><br />

              <label>Senha: </label>
              <input type='password' name='senha' placeholder='Digite sua Senha' onChange={valueInput} value={data.senha} /><br /><br />

              <Link href={'/'}><button type='button'>Logar</button></Link>{' '}
              <button type='submit'>Salvar</button><br /><br />
            </form>
      
            <br /><br />
            <p>Sistema para acompanhar envios de livros</p>

      </main>
    </>
  )
}