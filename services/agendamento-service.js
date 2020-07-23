import {doRequest} from './doRequest'

export const realizarPagamento = async (pagamento) =>{

    const response = await doRequest('senes/api/pagamentos', 'POST', pagamento)

    if(response.status != 500){
        console.log('retornou response')
    }else{
        console.log('não retornou response')
    }

    return response
}

export const realizarAgendamento = async (agendamento) =>{

    const response = await doRequest('senes/api/agendamento/cadastro', 'POST', agendamento)

    if(response.status != 500){
        console.log('retornou response')
    }else{
        console.log('não retornou response')
    }

    return response
}

