import {doRequest} from './doRequest'

export const coletarDadosBeneficiario = async (codigo) =>{

    const response = await doRequest('senes/beneficiario/codigo/usuario/', 'GET', '', codigo)

    if(response.status != 500){
        console.log('retornou response')
    }else{
        console.log('não retornou response')
    }

    return response
}

export const coletarDadosCompanheiro = async (codigo) =>{

    const response = await doRequest('senes/companheiro/codigo/usuario/', 'GET', '', codigo)

    if(response.status != 500){
        console.log('retornou response')
    }else{
        console.log('não retornou response')
    }

    return response
}

export const coletarProfissionais = async () =>{

    const response = await doRequest('senes/companheiro/', 'GET', '', '')

    if(response.status != 500){
        console.log('retornou response')
    }else{
        console.log('não retornou response')
    }

    return response
}

export const coletarEndereco = async (cep) =>{

    const params = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
    }
    
    const cepDigitado = cep

    const URL = 'https://viacep.com.br/ws/'+ cepDigitado +'/json/'

    return await fetch(URL, params)
}

export const coletarDadosAgendamentoPorProfissional = async (codigo) =>{

    const response = await doRequest('senes/api/agendamento/lista/', 'GET', '', codigo)

    if(response.status != 500){
        console.log('retornou response')
    }else{
        console.log('não retornou response')
    }

    return response
}
