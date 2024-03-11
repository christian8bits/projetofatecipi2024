import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Visualizar() {
    const [data, setData] = useState([])
    const [message, setMessage] = useState('')
    const router = useRouter();
    //console.log(router.query.id);
    const [id] = useState(router.query.id)
    const getCliente = async () => {
        if (id === undefined) {
            setMessage('Erro: Cliente não encontrado!')
            return
        }

        await axios.get('http://localhost:8080/cliente/' + id)
            .then((response) => { // Acessa o then quando a API retornar status 200
                console.log(response.data.cliente);
                setData(response.data.cliente);
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
                <Link href={'/'}><button type='button'>Listar</button></Link>{' '}             
                <Link href={`/editar/${data.id}`}><button type='button'>Editar</button></Link>{' '}
                <h3>Detalhes do Cliente {data.id}</h3>
                <span><strong>Nome:</strong> {data.nome}</span><br />
                <span><strong>E-mail:</strong> {data.email}</span><br />
                <span><strong>CPF/CNPJ:</strong> {data.cpfcnpj}</span><br />
                <span><strong>Telefone:</strong> {data.telefone}</span>
                <h3>Endereço</h3>
                <span><strong>Logradouro:</strong> {data.logradouro}</span><br />
                <span><strong>Numero:</strong> {data.numero}</span><br />
                <span><strong>Bairro:</strong> {data.bairro}</span><br />
                <span><strong>Complemento:</strong> {data.complemento}</span><br />
                <span><strong>Cidade:</strong> {data.cidade}</span><br />
                <span><strong>UF:</strong> {data.uf}</span><br />
                <span><strong>CEP:</strong> {data.cep}</span><br />
            </main>
        </>
    )
}
