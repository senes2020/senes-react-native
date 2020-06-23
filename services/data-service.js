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

export const coletarProfissionais = async () =>{

    const response = await doRequest('senes/companheiro/', 'GET', '', '')

    if(response.status != 500){
        console.log('retornou response')
    }else{
        console.log('não retornou response')
    }

    return response
}