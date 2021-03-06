//Recursos do React/React Native
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator, Alert} from 'react-native'

//Importando componente de fontes
import * as Font from 'expo-font'

//Importando AppLoading para load de recursos
//e LinearGradient para background
import { AppLoading } from 'expo'

//Importando input com label flutuante
import FloatingLabelInput from '../tools/FloatingLabelInputBlue'
import { TouchableOpacity } from 'react-native-gesture-handler'

//Importando serviços
import { atualizarEmailPorNumero } from '../../services/auth-service'

const TelaAtualizarEmailEsquecimento = ({route, navigation}, props) => {

    //Interações com state
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [emailNovo, setEmailNovo] = useState('');
    const [celular, setCelular] = useState('');
    const [loading, setLoading] = useState(false);

    //Coleta de dados digitados em outra tela
    const {idUsuarioRecebido, cpfRecebido, celularBeneficiarioRecebido, celularCompanheiroRecebido} =  route.params;

    //Função para aplicar máscara do celular e setar no state
    const setarCelular = (texto) => {

        //Aplicando máscara de celular
        let novoTexto = texto.replace(/\D/g,"")             //Remove tudo o que não é dígito
        .replace(/^(\d{2})(\d)/g,"($1) $2") //Coloca parênteses em volta dos dois primeiros dígitos
        .replace(/(\d)(\d{4})$/,"$1-$2")
        
    
        //Setando CPF com máscara
        setCelular(novoTexto)
    }

    //Função de validação de celular
    const validarCelular = (celular) => {
        
        if(!celular.match(/^[1-9]{1}[0-9]{10,14}$/)){
            Alert.alert(
                "Erro de Cadastro :(",
                "Por gentileza, preencha o celular com um número válido.",
                [
                    
                    { text: "OK"}
                ],
                { cancelable: false }
            );
            return false
        }

        return true
    }

    //Função de validação do email
    const validarEmail = (email) => {
        if(!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            Alert.alert(
                "Erro de Cadastro :(",
                "Por gentileza, preencha o email com um endereço válido.",
                [
                    
                    { text: "OK"}
                ],
                { cancelable: false }
            );
            return false
        }
    
        return true
    }

    //Função de validação
    const validar = () =>{
        if(!emailNovo || !celular){
            Alert.alert(
                "Erro de Cadastro :(",
                "Por gentileza, preencha todos os campos antes de prosseguir.",
                [
                    
                    { text: "OK"}
                ],
                { cancelable: false }
            );
            return false
        }else{
             //Limpando máscara de Celular
             let celularUsuario = celular.replace(/\)/g, '')
                                        .replace(/\(/g, '')
                                        .replace(/-/g, '')
                                        .replace(/\s/g, '')

            return validarCelular(celularUsuario) && validarEmail(emailNovo) ? true : false;
        }
    }

    const atualizarEmail = async(e) => {

        //O retorno vazio encerra a thread do código
        if(!validar()) return

        //Atualizando tela com loading
        setLoading(true);

        let celularUsuario = celular.replace(/\)/g, '')
                                    .replace(/\(/g, '')
                                    .replace(/-/g, '')
                                    .replace(/\s/g, '')

        try{

            //Montagem de usuário para cadastro
            const usuarioEmailAtualizado = {
                emailAtualizacao: emailNovo,
                numeroAtualizacao: celularUsuario
            }
            
            //Realiza o envio de um código para o novo email a ser cadastrado
            const response = await atualizarEmailPorNumero(usuarioEmailAtualizado, idUsuarioRecebido)

            //Atualizando tela sem loading
            setLoading(false);
        
            //Se a resposta voltar com status 200 OK, 
            //retira a informação de email da promessa
            //e seta o email no state
            if(response.ok){

                //Enviar dados para o Spring cadastrar o novo beneficiário e enviar email
                //Pasar para próxima página coletando o email
                navigation.navigate('ConfirmacaoAtualizacaoEmail',
                {
                    emailDigitado: emailNovo,
                    cpfRecebido: cpfRecebido
                })

            }else if(response.status == 404){
                
                Alert.alert(
                "Erro de Atualização :(",
                "Por gentileza, insira um número já cadastrado em sua conta com DDD. O número inserido não foi encontrado.",
                [
                    
                    { text: "OK"}
                ],
                { cancelable: false }
                );
            }else{
                console.log(response.status)
            }

        }catch(erro){
            console.log('entrei no catch daqui')
            console.log(erro)
        }

    }

    //Código para carregamento das fontes antes da renderização
    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        );
    }

    async function loadResourcesAsync() {
        await Promise.all([
            Font.loadAsync({
                'montserrat-regular-texto': require('../../assets/fonts/montserrat/Montserrat-Regular.ttf'),
                'montserrat-titulo': require('../../assets/fonts/montserrat/Montserrat-Light.ttf'),
                'montserrat-titulo-magro': require('../../assets/fonts/montserrat/Montserrat-Thin.ttf'),
                'montserrat-negrito': require('../../assets/fonts/montserrat/Montserrat-SemiBold.ttf')
            }),
        ]);
    }

    function handleLoadingError(error) {
    console.warn(error);
    }

    function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
    }

    return (
        <View style={styles.container}>

            <View
                style={[
                styles.containerLoading,
                {
                    backgroundColor: loading
                    ? "#CCCCCC55"
                    : "#FFFFFF00",
                },
                ]}
            >
                <ActivityIndicator
                size="large"
                animating={loading}
                color="#005E80"
                />
            </View>

            <Text style={styles.texto}>Para atualizar o email, primeiro precisamos confirmar que essa conta é sua. 
            Por gentileza, insira um celular cadastrado como abaixo e um novo email.</Text>
            {
            
            celularBeneficiarioRecebido || celularCompanheiroRecebido ?
            
            <Text style={styles.texto_celular}>
                {celularBeneficiarioRecebido ? celularBeneficiarioRecebido : null}
                {celularBeneficiarioRecebido && celularCompanheiroRecebido ? ' ou ' : null}
                {celularCompanheiroRecebido ? celularCompanheiroRecebido : null}
            </Text>

            :

            null
            
            }
            
            <FloatingLabelInput
                label="Digite um número cadastrado"
                value={celular ? celular : ''}
                onChangeText={(texto) => setarCelular(texto)}
                maxLength={15}
                keyboardType={'numeric'}
                editable={loading ? false: true}
            />
            <FloatingLabelInput
                label="Digite seu melhor email atual"
                value={emailNovo ? emailNovo : ''}
                onChangeText={(texto) => setEmailNovo(texto)}
                editable={loading ? false: true}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={atualizarEmail}
                disabled={loading ? true : false}
                >
                <Text style={styles.button_texto}>ENVIAR</Text>
            </TouchableOpacity>
        </View>   
      )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
    },
    containerLoading: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },
    texto: {
        color: "#005E80",
        fontFamily: "montserrat-regular-texto",
        fontSize: 25,
        textAlign: 'center',
        margin: 30
    },
    texto_celular: {
        color: "#005E80",
        fontFamily: "montserrat-regular-texto",
        fontSize: 25,
        textAlign: 'center',
        margin: 30
    },
    image: {
        width: 150,
        height: 150,
        margin: 20,
        alignSelf: 'center'
    },
    button: {
        height: 50,
        margin: 40,
        borderColor: "#005E80",
        borderWidth: 2,
        borderRadius: 20
    },
    button_texto:{
        fontFamily: "montserrat-regular-texto",
        color: "#005E80",
        textAlign: "center",
        fontSize: 20,
        marginTop: 10
    },

})

export default TelaAtualizarEmailEsquecimento