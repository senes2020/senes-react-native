//SEMPRE QUE MANDAR PRO GIT ESCONDER O IP
const URL = 'http://:8080/'

//Determinando um valor padrão para o body 
export const doRequest = async (resource, method, body = '', urlParam = '') =>{

    const params = {
        method: method,
        headers: {
            'Content-type': 'application/json'
        },
    } 

    //O método includes() determina se uma matriz contém um elemento especificado.
    //Este método retorna verdadeiro se a matriz contém o elemento, e falso se não.
    
    if(!['GET', 'DELETE'].includes(method)){
        params.body = JSON.stringify(body)
    } 

    console.log(URL + resource + urlParam)
    console.log(params)

    //Método para realizar requisições assíncronas
    //espera como obrigatório a URI e possui outros parâmetros não obrigatórios
    //passando parâmetros por variável params
    //O fetch() já implementa uma Promise, podendo utilizar async e await
    //Sempre que utilizar Promise utilizar o try catch, (principalmente quando utilizado async await)
    //Refatorado em 03/03, retorna o resolve ou reject, deixando o try/catch para quem utilizar a função
    return await fetch(URL + resource + urlParam, params)
}