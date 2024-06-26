import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { IMaskInput } from 'react-imask'

export default function Editar() {
    const [data, setData] = useState([])
    const [mensagem, setMessage] = useState('')
    const router = useRouter()
    const [id] = useState(router.query.id)
    const getPedido = async () => {
        if (id === undefined) {
            setMessage('Erro: pedido NÃO encontrado!')
            return
        }

        await axios.get('http://localhost:8080/pedido/' + id)
            .then((response) => {
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

    const valueInput = (e) => setData({ ...data, [e.target.name]: e.target.value })

    const buscaCEP = async (cepInput) => {
        console.log(cepInput)
        console.log(data.cep)
        await axios.get('https://viacep.com.br/ws/' + cepInput + '/json')
            .then((response) => {
                console.log('Busca CEP')
                console.log(response.data)
                console.log(data.telefone)

                setData({
                    dataPagamento: data.dataPagamento,
                    pedido: data.pedido,
                    codigoev: data.codigoev,
                    comprador: data.comprador,
                    destinatário: data.destinatario,
                    cpfcnpj: data.cpfcnpj,
                    cep: data.cep,
                    logradouro: response.data.logradouro,
                    numero: '',
                    bairro: response.data.bairro,
                    cidade: response.data.localidade,
                    complemento: response.data.complemento,
                    uf: response.data.uf,
                    formaenvio: data.formaenvio,
                    codigorastreio: data.codigorastreio
                })
            }).catch((err) => {
                if (err.response) {
                    setMessage(err.response.data)
                } else {
                    setMessage('Erro: Tente novamente mais tarde!')
                }
            })
    }




    const editarPedido = async (e) => {
        e.preventDefault()
        const headers = {
            'headers': {
                'Content-Type': 'application/json'
            }
        }
        await axios.put('http://localhost:8080/pedidos', data, headers)
            .then((response) => {
                setMessage(response.data.mensagem)
            }).catch((err) => {
                if (err.response) {
                    setMessage(err.response.data.mensagem)
                } else {
                    setMessage('Erro: Tente novamente mais tarde ou solicite ajuda ao suporte!')
                }
            })
    }



    const maskcep = [{ mask: '00000-000' }]
    const maskcpf = [{ mask: '000.000.000-00' }, { mask: '00.000.000/0000-00' }]
    const maskuf = [{ mask: 'aa' }]
    const maskdata = [{ mask: '00/00/0000' }]
    return (
        <>
            <Head>
                <title>Monitora Envios</title>
                <meta name='description' content='Generated by create next app' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>
                <Link href={"/principal"}><button type='button'>Home</button></Link>{' '}
                <Link href={'/listarPedidos'}><button type='button'>Listar</button></Link>

                <h2>Editar Pedido {data.id}:</h2>
                {mensagem ? <p>{mensagem}</p> : ''}

                <form onSubmit={editarPedido}>


                <label>Comprador:  </label>
                    <input type='text' name='comprador' placeholder=' ' onChange={valueInput} value={data.comprador} /> 
                    <label>CPF/CNPJ:  </label>
                    <IMaskInput mask={maskcpf} name='cpfcnpj' placeholder='000.000.000-00' onChange={valueInput} value={data.cpfcnpj} /> 
                    
                    
                    <label>Destinatário:  </label>
                    <input type='text' name='destinatario' placeholder='Nome Destinatário' onChange={valueInput} value={data.destinatario} /> 
                    <label>CEP:  </label>
                    <IMaskInput mask={maskcep} name='cep' placeholder='00000-000 ' onChange={valueInput} value={data.cep} />  
                    <label> {' '}  </label>
                    <button type='button'  className="button2" onClick={() => buscaCEP(data.cep)}>Buscar Cep</button>     <label>Logradouro:  </label>
                    <input type='text' name='logradouro' placeholder=' ' onChange={valueInput} value={data.logradouro} /> 
                    <label>Numero:  </label>
                    <input type='number' name='numero' placeholder=' ' onChange={valueInput} value={data.numero} /> 
                    <label>Bairro:  </label>
                    <input type='text' name='bairro' placeholder=' ' onChange={valueInput} value={data.bairro} /> 
                    <label>Complemento:  </label>
                    <input type='text' name='complemento' placeholder=' ' onChange={valueInput} value={data.complemento} /> 
                    <label>UF:  </label>
                    <IMaskInput mask={maskuf} name='uf' placeholder='' onChange={valueInput} value={data.uf} /> 
                    <label>Cidade:  </label>
                    <input type='text' name='cidade' placeholder=' ' onChange={valueInput} value={data.cidade} /> 
                    
                    
                    <label>Data Pagamento:  </label>
                    <IMaskInput mask={maskdata} name='dataPagamento' placeholder='00/00/0000 ' onChange={valueInput} value={data.dataPagamento} />
                  
                    {" "}<label>Forma de Envio: </label>
                    <select name="formaenvio" defaultValue="Normal" onChange={valueInput} value={data.formaenvio}>
                        <option value="Normal">	Normal	</option>
                        <option value="PAC">	PAC	</option>
                        <option value="SEDEX">SEDEX</option>
                    </select>
                    <label>Código Rastreio:  </label>
                    <input type='text' name='codigorastreio' placeholder=' ' onChange={valueInput} value={data.codigorastreio} /> 


                    <button type='submit'>Salvar</button>
                </form>
            </main>
        </>
    )
}