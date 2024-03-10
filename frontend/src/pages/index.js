import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function Home() {
  const [data, setData] = useState([])
  const [pagina, setPage] = useState("")
  const [ultimaPagina, setLastPage] = useState("")
  const [message, setMessage] = useState("")

  const getClientes = async (pagina) => {
    if (pagina === undefined) {
      pagina = 1
    }
    setPage(pagina)
    console.log(pagina)
    await axios.get("http://localhost:8080/clientes?page=" + pagina)
      .then((response) => {
        console.log(response.data.clientes)
        setData(response.data.clientes)
        setLastPage(response.data.paginacao.ultimaPagina)
      }).catch((err) => {
        if (err.response) {
          setMessage(err.response.data.mensagem)
        } else {
          setMessage('Erro: Tente novamente mais tarde!')
        }
      })
  }

  useEffect(() => {
    getClientes()
  }, [])

  // função excluir cliente 
  const deleteCliente = async (idCliente) => {
    if (window.confirm('Tem certeza que deseja apagar?')) {

      //IMPLEMENTAR

      
      getClientes(pagina)
    }
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
        <Link href={"/cadastrar"}><button type='button'>Cadastrar</button></Link>
        <h2>Listar Clientes</h2>
        
        {message ? <p>{message}</p> : ""}

        {data.map(cliente => (
          <div key={cliente.id}>
            <span>ID: {cliente.id}</span><br />
            <span>Nome: {cliente.nome}</span><br />
            <span>E-mail: {cliente.email}</span><br /><br />
            <Link href={`/visualizar/${cliente.id}`}><button type='button'>Visualizar</button></Link>{" "}
            <Link href={`/editar/${cliente.id}`}><button type='button'>Editar</button></Link>{" "}
            <button type='button' onClick={() => deleteCliente(cliente.id)}>Apagar</button>{" "}<br />
            <hr />
          </div>
        ))}

        {pagina !== 1 ? <button type='button' onClick={() => getClientes(1)}>Primeira</button> : <button type='button' disabled>Primeira</button>}{" "}
        {pagina !== 1 ? <button type='button' onClick={() => getClientes(pagina - 1)}>{pagina - 1}</button> : ""}{" "}
        <button type='button' disabled>{pagina}</button>{" "}
        {pagina + 1 <= ultimaPagina ? <button type='button' onClick={() => getClientes(pagina + 1)}>{pagina + 1}</button> : ""}{" "}
        {pagina !== ultimaPagina ? <button type='button' onClick={() => getClientes(ultimaPagina)}>Última</button> : <button type='button' disabled>Última</button>}{" "}
        <br /><br />
      </main>
    </>
  )
}