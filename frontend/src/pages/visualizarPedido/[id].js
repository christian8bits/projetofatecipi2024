import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Visualizar() {
    const [data, setData] = useState([])
    const [message, setMessage] = useState('')
    const router = useRouter()
    const [id] = useState(router.query.id)
    const [codigoev] = useState(router.query.codigoev)

    const getPedido = async () => {
        if (id === undefined) {
            setMessage('Erro: pedido não encontrado!')
            return
        }

        await axios.get('http://localhost:8080/pedido/' + id)
            .then((response) => { // Acessa o then quando a API retornar status 200
                console.log(response.data.pedido)
                setData(response.data.pedido)
            }).catch((err) => {
                if (err.response) {
                    setMessage(err.response.data.mensagem)
                } else {
                    setMessage('Erro: Tente novamente mais tarde!')
                }
            })
    }

    useEffect(() => {
        getPedido()
    }, [id])


    const getLivro = async () => {
        if (codigoev === undefined) {
            setMessage('Erro: pedido não encontrado!')
            return
        }
    
        await axios.get('http://localhost:8080/livropedido/' + codigoev)
            .then((response) => { // Acessa o then quando a API retornar status 200
                console.log(response.data.livro)
                return response.data.livro
            }).catch((err) => {
                if (err.response) {
                    console.log('Erro: Tente novamente mais tarde!')
                } else {
                   console.log('Erro: Tente novamente mais tarde!')
                }
            })
    }
    


useEffect(() => {
    console.log(getLivro())
}, [codigoev])

    return (
        <>
            <Head>
                <title>Monitora Envios</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Link href={"/principal"}><button type='button'>Home</button></Link>{' '}
                <Link href={'/listarPedidos'}><button type='button'>Listar</button></Link>{' '}
                <Link href={`/editarPedido/${data.id}`}><button type='button'>Editar</button></Link>{' '}
                <br></br>  <br></br>


                <h3>Pedido Nº: {data.id}</h3>
                <form>
                    <span><strong>Comprador:</strong> {data.comprador}</span>
                    <span><strong>CPF/CNPJ:</strong> {data.cpfcnpj}</span>
                </form>
                <h4>Endereço de Entrega: </h4>
                <form className="form3">
                    <span><strong>Destinário:</strong> {data.destinario}</span>
                    <span><strong>Logradouro:</strong> {data.logradouro}</span>
                    <span><strong>Numero:</strong> {data.numero}</span>
                    <span><strong>Bairro:</strong> {data.bairro}</span>
                    <span><strong>Complemento:</strong> {data.complemento}</span>
                    <span><strong>Cidade:</strong> {data.cidade}</span>
                    <span><strong>UF:</strong> {data.uf}</span>
                    <span><strong>CEP:</strong> {data.cep}</span>
                </form>


                <h4>Detalhes Pedido: </h4>
                <form className="form3">
                    <span><strong>Data Pagamento:</strong> {data.dataPagamento}</span>
                    <span><strong>Forma de Envio:</strong> {data.formaenvio}</span>
                    <span><strong>Frete:</strong> {data.frete}</span>
                    <span><strong>Preço:</strong>{'0'} </span>
                    <span><strong>Valor:</strong> {data.valortotal}</span>
                    <label>{''}</label>
                    </form>
                    <form>
                    <span><strong>Código de Rastreamento:</strong> {data.codigorastreio}</span>
                    <span><strong>Código EV:</strong> {data.codigoev}</span>
                 

                    </form>

            </main>
        </>
    )
}