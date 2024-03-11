import Head from 'next/head'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { servDelete } from '@/services/servDelete'


export default function Home() {
  const [data, setData] = useState([])
  const [pagina, setPage] = useState('')
  const [ultimaPagina, setLastPage] = useState('')
  const [message, setMessage] = useState('')
  const [pesquisa, setPesquisa] = useState('')



  const getClientes = async (pagina) => {
    if (pagina === undefined) {
      pagina = 1
    }
    setPage(pagina)
    console.log(pagina)
    await axios.get("http://localhost:8080/clientes?pagina=" + pagina)
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

  // chama funcao excluir cliente 
  const deleteCliente = async (idCliente) => {
    if (window.confirm('Tem certeza que deseja apagar?')) {
      const response = await servDelete('http://localhost:8080/clientes/' + idCliente)
      setMessage(response)
      getClientes(pagina)
    }
  }
  console.log(pesquisa)
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
        <label>Pesquisa:  </label>
        <input
          name='pesquisa' 
          type='text'
          value={pesquisa}
          onChange={(ev) => setPesquisa(ev.target.value)}
        /> <br /><br />
        
       

        <table border="1">
          <tbody>
            <tr>
              <th>Nº</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>CPF</th>
            </tr>
            {data.map(cliente => (
              <tr key={cliente.id}>
                <td>{cliente.id} </td>
                <td> {cliente.nome}</td>
                <td>  {cliente.email}</td>
                <td>  {cliente.cpfcnpj}</td>
                <td> <Link href={`/visualizar/${cliente.id}`}><button type='button'>Visualizar</button></Link>{" "}</td>
                <td>  <Link href={`/editar/${cliente.id}`}><button type='button'>Editar</button></Link>{" "}</td>
                <td> <button type='button' onClick={() => deleteCliente(cliente.id)}>Apagar</button>{" "}</td>
              </tr>
            ))}
          </tbody>
        </table>

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