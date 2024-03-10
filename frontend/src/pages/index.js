import Head from "next/head"
import { useState } from "react"
import axios from "axios"

export default function Home() {

  const [data, setData] = useState({
    nome: '',
    email: ''
  })

  const [message, setMessage] = useState('');
  // recebe dados do formulario
  const valueInput = (e) => setData({ ...data, [e.target.name]: e.target.value })

  const addUser = async (e) => {
    e.preventDefault() // bloqueia recarregamento da página
    console.log('Chama API')
    console.log("Cliente Nome: " + data.nome)
    console.log("Cliente E-mail: " + data.email)
    const headers = {
      'headers': {
        'Content-Type': 'application/json'
      }
    }
    // requisição para o servidor 
    await axios.post('http://localhost:8080/clientes', data, headers)
      .then((response) => {
        console.log(response.data.mensagem);
        setMessage(response.data.mensagem);
        // limpa os dados do state e os dados dos campos
        setData({
          nome: '',
          email: ''
        })
      }).catch((err) => {
        console.log(err.response.data.mensagem)
        if (err.response) {
          setMessage(err.response.data.mensagem)
        } else {
          setMessage("Erro: Conexão com servidor NÃO estabelecida, tentar novamente!")
        }
      })
  }

  return (
    <>
      <Head>
        <title>Monitora Envios</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h2>Cadastrar Cliente</h2>
        {message ? <p>{message}</p> : ""}

        <form onSubmit={addUser}>
          <label>Nome:  </label>
          <input type='text' name='nome' placeholder='Digite Nome' onChange={valueInput} value={data.nome} /> <br /><br />
          <label>E-Mail: </label>
          <input type='email' name='email' placeholder='Digite E-Mail' onChange={valueInput} value={data.email} /> <br /><br />
          <button type='submit'>Salvar</button><br /><br />
        </form>
      </main>
    </>
  )
}