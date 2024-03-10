import axios from 'axios'

// funcao separada para apagar registro
export const servDelete = async (url) => {
    var mensagem
    await axios.delete(url)
        .then((response) => { 
            mensagem = response.data.mensagem
            //console.log(mensagem)
        }).catch((err) => {
            //console.log(err.response.data.mensagem)
            if (err.response) {
                mensagem = err.response.data.mensagem
            } else {
                mensagem = 'Erro: Tente novamente '
            }
        })

    return mensagem
}