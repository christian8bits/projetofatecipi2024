import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function Editar() {
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

    const valueInput = (e) => setData({ ...data, [e.target.name]: e.target.value })

    const editarCliente = async (e) => {
        e.preventDefault();

        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        }

        await axios.put('http://localhost:8080/clientes', data, headers)
            .then((response) => {
                setMessage(response.data.mensagem);
            }).catch((err) => {
                if (err.response) {
                    setMessage(err.response.data.mensagem)
                } else {
                    setMessage('Erro: Tente novamente mais tarde ou entre contato com ...!')
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
                <Link href={'/'}><button type='button'>Listar</button></Link>{' '}
                <h2>Editar Cliente {data.nome}</h2>
                {message ? <p>{message}</p> : ''}
                <form onSubmit={editarCliente}>
                    <label>código: {id} </label><br />
                    <label>Nome:  </label>
                    <input type='text' name='nome' placeholder='Nome Completo' onChange={valueInput} value={data.nome} /> <br /><br />
                    <label>E-Mail: </label>
                    <input type='email' name='email' placeholder='email@email.com' onChange={valueInput} value={data.email} /> <br /><br />
                    <label>CPF/CNPJ:  </label>
                    <input type='text' name='cpfcnpj' placeholder=' ' onChange={valueInput} value={data.cpfcnpj} /> <br /><br />
                    <label>Telefone:  </label>
                    <input type='text' name='telefone' placeholder=' ' onChange={valueInput} value={data.telefone} /> <br /><br />
                    <label>CEP:  </label>
                    <input type='text' name='cep' placeholder=' ' onChange={valueInput} value={data.cep} />
                    <button type='button' onClick={() => buscaCEP(data.cep)}>Validar</button>{" "} <br /><br />
                    <label>Logradouro:  </label>
                    <input type='text' name='logradouro' placeholder=' ' onChange={valueInput} value={data.logradouro} /> <br /><br />
                    <label>Numero:  </label>
                    <input type='text' name='numero' placeholder=' ' onChange={valueInput} value={data.numero} /> <br /><br />
                    <label>Bairro:  </label>
                    <input type='text' name='bairro' placeholder=' ' onChange={valueInput} value={data.bairro} /> <br /><br />
                    <label>Complemento:  </label>
                    <input type='text' name='complemento' placeholder=' ' onChange={valueInput} value={data.complemento} /> <br /><br />
                    <label>UF:  </label>
                    <input type='text' name='uf' placeholder='' onChange={valueInput} value={data.uf} /> <br /><br />
                    <label>Cidade:  </label>
                    <input type='text' name='cidade' placeholder=' ' onChange={valueInput} value={data.cidade} /> <br /><br />
                    <button type='submit'>Salvar</button>
                </form>
            </main>
        </>
    )
}