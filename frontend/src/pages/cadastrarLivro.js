import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function Livro() {
  const [data, setData] = useState({
    usuario: '',
    email: '',
    senha: ''
  })



  const [mensagem, setMessage] = useState('')
  const valueInput = (e) => setData({ ...data, [e.target.name]: e.target.value })

  const cadastrarLivro = async (e) => {
    e.preventDefault()
    const headers = {
      'headers': {
        'Content-Type': 'application/json'
      }
    }
    await axios.post('http://localhost:8080/cadastrarLivro', data, headers)
      .then((response) => {
        setMessage(response.data.mensagem)
        setData({
          titulo: '',
          autor: '',
          editora: ''
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
          <h2>Cadastro Novo Livro</h2>
          {mensagem ? <p>{mensagem}</p> : ''}

            <form onSubmit={cadastrarLivro}>
              <label>Titulo: </label>
              <input type='text' name='titulo' placeholder='' onChange={valueInput} value={data.titulo} /><br /><br />
              <label>Autor: </label>
              <input type='text' name='autor' placeholder='' onChange={valueInput} value={data.autor} /><br /><br />

              <label>Editora: </label>
              <input type='text' name='editora' placeholder='' onChange={valueInput} value={data.editora} /><br /><br />


              <button type='submit'>Salvar</button><br /><br />
            </form>
      
            <br /><br />
            <p>Sistema para acompanhar envios de livros</p>

      </main>
    </>
  )
}