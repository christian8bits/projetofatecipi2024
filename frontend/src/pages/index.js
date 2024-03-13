import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [data, setData] = useState({
    usuario: '',
    senha: ''
  })

  const [mensagem, setMessage] = useState('')
  const valueInput = (e) => setData({ ...data, [e.target.name]: e.target.value });

  const entrarLogin = async (e) => {
    e.preventDefault() // bloquear o recarregamento da página
    const headers = {
      'headers': {
        'Content-Type': 'application/json'
      }
    }
    await axios.post('http://localhost:8080/login', data, headers)
      .then((response) => { // entra quando a API retornar status 200
        setMessage(response.data.mensagem)
        setData({
          usuario: '',
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
        <title>Login - Monitora Entregas</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div id='centralizaDiv'>
          <h2>Entrar - Monitoramento de Envios</h2>
          <div id='verticalDiv'>
            <form>
              <label>Usuário: </label>
              <input type='text' name='usuario' placeholder='Digite o nome' onChange={valueInput} value={data.usuario} /><br /><br />
              <label>Senha: </label>
              <input type='password' name='senha' placeholder='Digite sua Senha' onChange={valueInput} value={data.senha} /><br /><br />
              <Link href={'/listarClientes'}><button type='button'>Entrar</button></Link>{' '}
              <Link href={'/cadastrarLogin'}><button type='button'>Cadastrar</button></Link>{' '}
            </form>
            <br /><br />
            <p>Sistema para acompanhar envios de livros</p>
          </div>
        </div>
      </main>
    </>
  )

}