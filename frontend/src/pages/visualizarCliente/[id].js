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
    const getCliente = async () => {
        if (id === undefined) {
            setMessage('Erro: Cliente não encontrado!')
            return
        }

        await axios.get('http://localhost:8080/cliente/' + id)
            .then((response) => { // Acessa o then quando a API retornar status 200
                console.log(response.data.cliente)
                setData(response.data.cliente)
            }).catch((err) => {
                if (err.response) {
                    setMessage(err.response.data.mensagem)
                } else {
                    setMessage('Erro: Tente novamente mais tarde!')
                }
            })
    }

    useEffect(() => {
        getCliente()
    }, [id])

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
                <Link href={'/listarClientes'}><button type='button'>Listar</button></Link>{' '}
                <Link href={`/editarCliente/${data.id}`}><button type='button'>Editar</button></Link>{' '}
                <br/> <br/>
                <h3>Detalhes do Cliente {data.id}:</h3>
                <form class="form2">
                <span><strong>Nome:</strong> {data.comprador}</span>
                <span><strong>E-mail:</strong> {data.email}</span>
                <span><strong>CPF/CNPJ:</strong> {data.cpfcnpj}</span>
                <span><strong>Telefone:</strong> {data.telefone}</span>
                </form>
                <br/> 
                <h4>Endereço:</h4>
                <form>
                <span><strong>Logradouro:</strong> {data.logradouro}</span>
                <span><strong>Numero:</strong> {data.numero}</span>
                <span><strong>Bairro:</strong> {data.bairro}</span>
                <span><strong>Complemento:</strong> {data.complemento}</span>
                <span><strong>Cidade:</strong> {data.cidade}</span>
                <span><strong>UF:</strong> {data.uf}</span>
                <span><strong>CEP:</strong> {data.cep}</span>
                </form>
            </main>
        </>
    )
}
