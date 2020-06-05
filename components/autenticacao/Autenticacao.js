//Recursos do React/React Native
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'

//Importando componente de fontes
import * as Font from 'expo-font'

//Importando AppLoading para load de recursos
import { AppLoading } from 'expo';

//Importando input com label flutuante
import FloatingLabelInput from '../tools/FloatingLabelInputWhite'

//Importando serviços
import { isSignedIn, autenticarCpf } from '../../services/auth-service'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


//Fonte: https://www.npmjs.com/package/react-native-simple-toast
//Importando toast simples para avisos de validação

const TelaAutenticacao = ({navigation}, props) =>{

    useEffect(() => {
        const session = isSignedIn()
        if(session.length){
            //Atualmente mandando para a Index, mas é só pra exemplo
            //Futuramente deve enviar para a Home
            navigation.navigate('AutenticacaoPerfil')
        }
    });

    //Interações com state
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [cpf, setCpf] = useState('');
    const [loading, setLoading] = useState(false);

    //Função para aplicar máscara do CPF e setar no state
    const setarCpf = (texto) => {

        //Aplicando máscara de CPF
        let novoTexto = texto.replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1') // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    
        //Setando CPF com máscara
        setCpf(novoTexto)
    }

    //Função para validação de CPF
    const validarCpf = (strCPF) => {
        let resto;
        let soma = 0;

        if(strCPF.length < 11){
            Alert.alert(
                "Erro de Autenticação :(",
                "Por gentileza, digite um CPF com no mínimo 11 caracteres.",
                [
                    
                    { text: "OK"}
                ],
                { cancelable: false }
            );
            return false
        }
        
        if(strCPF == "00000000000" || strCPF == "11111111111" || strCPF == "22222222222"
        || strCPF == "33333333333" || strCPF == "44444444444" || strCPF == "55555555555"
        || strCPF == "66666666666" || strCPF == "77777777777" || strCPF == "88888888888"
        || strCPF == "99999999999"){
            Alert.alert(
                "Erro de Autenticação :(",
                "Por gentileza, digite um CPF válido.",
                [
                    
                    { text: "OK"}
                ],
                { cancelable: false }
            );
            return false;
        } 
         
        for(let i=1; i<=9; i++){
            soma = soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
            resto = (soma * 10) % 11;
        } 
       
        if ((resto == 10) || (resto == 11))  resto = 0;
        if (resto != parseInt(strCPF.substring(9, 10)) ){
            Alert.alert(
                "Erro de Autenticação :(",
                "Por gentileza, digite um CPF válido.",
                [
                    
                    { text: "OK"}
                ],
                { cancelable: false }
            );
            return false;
        } 
       
        soma = 0;
        for(let i = 1; i <= 10; i++){
            soma = soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
            resto = (soma * 10) % 11;
        } 
       
        if ((resto == 10) || (resto == 11))  resto = 0;
        if (resto != parseInt(strCPF.substring(10, 11) ) ){
            Alert.alert(
                "Erro de Autenticação :(",
                "Por gentileza, digite um CPF válido.",
                [
                    
                    { text: "OK"}
                ],
                { cancelable: false }
            );
            return false;
        }

        return true;
    }

    //Função que aplica as validações
    const validar = () =>{
        
        if(!cpf){
            Alert.alert(
                "Erro de Autenticação :(",
                "Por gentileza, preencha todos os campos antes de prosseguir.",
                [
                    
                    { text: "OK"}
                ],
                { cancelable: false }
            );
            return false
        }else{

            //Limpando máscara do CPF
            let cpfUsuario = cpf.replace(/\./g, '').replace(/-/g, '');

            if(validarCpf(cpfUsuario)){
                return true;
            }
        }
    }

    const autenticarCpfFunc = async(e) => {

         //Atualizando tela com loading
         setLoading(true);

        //O retorno vazio encerra a thread do código
        if(!validar()){
            setLoading(false);
            return
        } 

        try{

            //Limpando máscara do CPF
            let cpfUsuario = cpf.replace(/\./g, '').replace(/-/g, '');

            //Realiza a solicitação do serviço de autenticação por CPF
            const response = await autenticarCpf(cpfUsuario)

             //Atualizando tela sem loading
             setLoading(false);
        
            //Se a resposta voltar com status 200 OK, 
            //retira a informação de email da promessa
            //e seta o email no state
            if(response.ok){

                response.json().then((json) => {
               
                    const emailBanco = json.email;
            
                    const idUsuarioBanco = json.id;
                
                    const cpfBanco = json.cpf;
                    
                    navigation.navigate(
                        'AutenticacaoCodigo',
                        {
                            cpfRecebido: cpfBanco,
                            emailRecebido: emailBanco,
                            idUsuarioRecebido: idUsuarioBanco
                        })
                })

            }else if(response.status == 404){
                Alert.alert(
                    "CPF não encontrado :(",
                    "Vejo que seu CPF ainda não está com a gente, gostaria de se cadastrar?",
                    [
                      {
                        text: "Cancelar",
                        
                      },
                      { text: "Me cadastre ^^", onPress: () => navigation.navigate('CadastroIntro') }
                    ],
                    { cancelable: true }
                  );
            }else{
                console.log('não vai rolar, kirido')
            }

        }catch(erro){
            console.log('entrei no catch')
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
        <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
        >
           <Image
            style={styles.image_logo}
            source={require('../../assets/logo/logo_png_light.png')}
           />

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

        <FloatingLabelInput
            label="Digite seu CPF ^^"
            value={cpf ? cpf : ''}
            onChangeText={(texto) => setarCpf(texto)}
            maxLength={14}
            keyboardType={'numeric'}
            editable={loading ? false : true}
        />

        <TouchableOpacity
         style={styles.button}
         onPress={autenticarCpfFunc}
         disabled={ loading ? true : false}
        >
         <Text style={styles.button_texto}> ENTRAR</Text>
       </TouchableOpacity>

       <TouchableOpacity
         style={styles.button_info}
        >
         <Image
            style={styles.image_info}
            source={require('../../assets/icons/ajuda_branco.png')}
         />
       </TouchableOpacity>

       </KeyboardAwareScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#005E80",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around"
    },
    containerLoading: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center"
    },
    image_logo: {
        width: 200,
        height: 200,
        alignSelf: "center"
    },
    button: {
        height: 50,
        margin: 40,
        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 20
    },
    button_info: {
        height: 50,
        width: 50,
        margin: 30,
        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 60,
        justifyContent: "center"
    },
    image_info: {
        width: 50,
        resizeMode: "contain",
        alignSelf: "center"
    },
    button_texto:{
        fontFamily: "montserrat-regular-texto",
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 20,
        marginTop: 10
    },
    input: {
        height: 50,
        margin: 30,
        fontFamily: "montserrat-regular-texto",
        color: "#FFFFFF",
        fontSize: 20,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF'
    }
})

export default TelaAutenticacao