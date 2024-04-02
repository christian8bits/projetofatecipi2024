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
  const xlsx = require('xlsx')



  const getLivros = async (pagina) => {
    console.log('get livros')
    console.log(pagina)
    if (pagina === undefined) {
      pagina = 1
    }
    setPage(pagina)
    console.log(pagina)
    await axios.get("http://localhost:8080/livros?pagina=" + pagina)
      .then((response) => {
        console.log(response.data.livros)
        setData(response.data.livros)
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
    getLivros()
  }, [])

  // chama funcao excluir Livro 
  const deleteLivro = async (idLivro) => {
    if (window.confirm('Tem certeza que deseja apagar?')) {
      const response = await servDelete('http://localhost:8080/livros/' + idLivro)
      setMessage(response)
      getLivros(pagina)
    }
  }
  console.log(pesquisa)

  console.log(data)

  const selecionaDados = async (e) => {
    const reader = new FileReader()
    reader.readAsBinaryString(e.target.files[0])
    reader.onload = (e) => {
      const data = e.target.result
      const workbook = xlsx.read(data, { type: "binary" })
      const sheetName = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetName]
      const parsedData = xlsx.utils.sheet_to_json(sheet)
      //setData(parsedData)
      console.log(parsedData)
      importarDados(parsedData)
      
      
      
    }
}

const importarDados = async (jsonPlanilha) => {
 const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        }
            await axios.post('http://localhost:8080/livrosplanilha', jsonPlanilha, headers)
            
              console.log("Testado")
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
        <Link href={"/cadastrarLivro"}><button type='button'>Cadastrar</button></Link>
        <h2>Listar Livros</h2>

        <input type='file' accept='.xlsx' onChange={selecionaDados} /><br /><br/>


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
              <th>Titulo</th>
              <th>Autor</th>
              <th>Editora</th>
            </tr>
       
       
  
            {data?.map((l, index)=> (
              <tr key={index}>
                <td>{l.id} </td>
                <td> {l.titulo}</td>
                <td>  {l.autor}</td>
                <td>  {l.editora}</td>
                <td> <Link href={`/visualizarLivro/${l.id}`}><button type='button'>Visualizar</button></Link>{" "}</td>
                <td>  <Link href={`/editarLivro/${l.id}`}><button type='button'>Editar</button></Link>{" "}</td>
                <td> <button type='button' onClick={() => deleteLivro(l.id)}>Apagar</button>{" "}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {pagina !== 1 ? <button type='button' onClick={() => getLivros(1)}>Primeira</button> : <button type='button' disabled>Primeira</button>}{" "}

        {pagina !== 1 ? <button type='button' onClick={() => getLivros(pagina - 1)}>{pagina - 1}</button> : ""}{" "}
        <button type='button' disabled>{pagina}</button>{" "}
        {pagina + 1 <= ultimaPagina ? <button type='button' onClick={() => getLivros(pagina + 1)}>{pagina + 1}</button> : ""}{" "}
        {pagina !== ultimaPagina ? <button type='button' onClick={() => getLivros(ultimaPagina)}>Última</button> : <button type='button' disabled>Última</button>}{" "}
        <br /><br />




      </main>
    </>
  )
}
