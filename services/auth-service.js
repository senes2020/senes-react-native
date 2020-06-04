import {doRequest} from './doRequest'
import { AsyncStorage } from 'react-native'

//Definindo chave para salvar o dado no WebStorage
const SESSION_KEY = '@senesapp:session'

const setSession = (usuario) => {
    AsyncStorage.setItem(SESSION_KEY, JSON.stringify(usuario))
}

//Montar serviço para: 
//enviar CPF, retornar telefone e chamar serviço de envio de código
//enviar código como SMS e armazenar esse código gerado
//enviar código recebido pelo usuário e liberar entrada
//verificar se usuário recebido tem dois perfis e encaminhar adequadamente


//Realiza o request de autenticação do usuário
//retornando a response e setando o token no webStorage
export const autenticarCpf = async (cpf) =>{

    const response = await doRequest('senes/usuario/autenticar/cpf/', 'GET', '', cpf)

    if(response.status != 500){
        console.log('retornou response')
    }else{
        console.log('não retornou response')
    }

    return response
}

//Realiza o request de autenticação do usuário
//retornando a response e setando o token no webStorage
export const autenticarCodigo = async (codigo) =>{

    const response = await doRequest('senes/usuario/autenticar/codigo/', 'GET', '', codigo)

    if(response.ok){
        //const usuario = await response.json()
        //setSession(usuario)
    }

    return response
}

//Realiza o envio de um código para o novo email que deseja cadastrar
export const atualizarEmailCodigo = async (objetoEmail, idUsuario) =>{

    const response = await doRequest('senes/usuario/atualizar/email/', 'PUT', objetoEmail, idUsuario)

    if(response.ok){
        //const usuario = await response.json()
        //setSession(usuario)
    }

    return response
}

export const atualizarEmailPorNumero = async (objetoEmail, idUsuario) =>{

    const response = await doRequest('senes/usuario/atualizar/codigo/', 'PUT', objetoEmail, idUsuario)

    if(response.ok){
        //const usuario = await response.json()
        //setSession(usuario)
    }

    return response
}

//Realiza o envio de um código para o novo email que deseja cadastrar
export const atualizarEmail = async (objetoEmail, codigo) =>{

    const response = await doRequest('senes/usuario/atualizar/email/codigo/', 'PUT', objetoEmail, codigo)

    if(response.ok){
        //const usuario = await response.json()
        //setSession(usuario)
    }

    return response
}


export const verificarFinaisCelularesUsuario = async (codigo) =>{

    const response = await doRequest('senes/usuario/celulares/', 'GET', '', codigo)

    if(response.status != 500){
        //const usuario = await response.json()
        //setSession(usuario)
    }

    return response
}

//Verifica se o usuário está logado através da existência do Token
export const isSignedIn = async () =>{
    const session = await AsyncStorage.getItem(SESSION_KEY)
    return JSON.parse(session)
}

//Deslogando o usuário, removendo o token armazenado
export const signOut = () => {
    return AsyncStorage.removeItem(SESSION_KEY)
}