import {doRequest} from './doRequest'
import { AsyncStorage } from 'react-native'

//Caminhos necessários
//Envio dos 4 parâmetros para cadastro do usuário
//Verificação do código

export const cadastrarUsuario = async (usuario) => {

    console.log('cheguei no método')

    //Método definido em doRequest.js
    //função genérica que realiza as requisições
    const response = await doRequest('senes/usuario/registrar/', 'POST', usuario)
    
    if(response.ok){
        //const usuario = await response.json()
        //setSession(usuario)
    }else{
        console.log('não deu ok')
    }

    return response

}

export const cadastrarBeneficiario = async (beneficiario) => {

    //Método definido em doRequest.js
    //função genérica que realiza as requisições
    const response = await doRequest('senes/beneficiario/registrar/', 'POST', beneficiario)
    
    if(response.status != 500){
        //const usuario = await response.json()
        //setSession(usuario)
    }else{
        console.log('não deu ok')
        console.log(response.status)
    }

    return response

}


