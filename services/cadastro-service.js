import {doRequest} from './doRequest'
import { AsyncStorage } from 'react-native'

//Caminhos necessários
//Envio dos 4 parâmetros para cadastro do usuário
//Verificação do código

export const cadastrar = async (usuario) => {

    console.log('cheguei no método')

    //Método definido em doRequest.js
    //função genérica que realiza as requisições
    const response = await doRequest('registrar', 'POST', usuario)
    
    if(response.ok){
        //const usuario = await response.json()
        //setSession(usuario)
    }else{
        console.log('não deu ok')
    }

    return response

}


