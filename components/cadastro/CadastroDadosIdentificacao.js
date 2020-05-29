//Recursos do React/React Native
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Alert} from 'react-native'

//Importando componente de fontes
import * as Font from 'expo-font'

//Importando AppLoading para load de recursos
//e LinearGradient para background
import { AppLoading } from 'expo'

//Importando input com label flutuante
import FloatingLabelInput from '../tools/FloatingLabelInputBlue'
import { TouchableOpacity } from 'react-native-gesture-handler'

const TelaCadastroDadosIdentificacao = ({navigation}, props) => {

    //Interações com state
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState('');

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
                "Erro de Cadastro :(",
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
                "Erro de Cadastro :(",
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
                "Erro de Cadastro :(",
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
                "Erro de Cadastro :(",
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

    //Função para validação de nomes
    const validarNome = (nome) =>{

        //Verificando se possui somente letras
        if(nome.match(/^[-+\d(), ]+$/)){
            Alert.alert(
                "Erro de Cadastro :(",
                'Por gentileza, digite apenas letras no nome.',
                [
                    
                    { text: "OK"}
                ],
                { cancelable: false }
            );
            return false
        }
        
        //Verificando se tem caracteres suficientes
        if(nome.trim().length < 3){
            Alert.alert(
                "Erro de Cadastro :(",
                'Por gentileza, digite um nome com mais de 3 caracteres.',
                [
                    
                    { text: "OK"}
                ],
                { cancelable: false }
            );
            return false
        }

        return true
    }

    const validar = () =>{

        //Limpando máscara de CPF
        let cpfUsuario = cpf.replace(/\./g, '').replace(/-/g, '')

        if(!cpf || !nome){
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
            if(validarNome(nome) && validarCpf(cpfUsuario)){
                return true;
            }
        }
    }

    const prosseguirCadastro = () =>{

        //O retorno vazio encerra a thread do código
        if(!validar()) return

        let cpfUsuario = cpf.replace(/\./g, '').replace(/-/g, '')
        
        navigation.navigate(
            'CadastroDadosContato',
            {
                nomeDigitado: nome,
                cpfDigitado: cpfUsuario
        })
    
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
            <Text style={styles.texto}>Vamos começar!</Text>
            <Text style={styles.texto}>Nos diga quem você é, isso é muito importante pra nós ^^</Text>
            <FloatingLabelInput
                label="Digite seu nome"
                value={nome ? nome : ''}
                onChangeText={(texto) => setNome(texto)}
                maxLength={20}
            />
            <FloatingLabelInput
                label="Digite seu CPF"
                value={cpf ? cpf : ''}
                onChangeText={(texto) => setarCpf(texto)}
                maxLength={14}
                keyboardType={'numeric'}
            />
            <Image
                style={styles.image}
                source={require('../../assets/icons/pessoa.png')}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={prosseguirCadastro}
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
    texto: {
        color: "#005E80",
        fontFamily: "montserrat-regular-texto",
        fontSize: 25,
        textAlign: 'center',
        margin: 30
    },
    image: {
        width: 150,
        height: 150,
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

export default TelaCadastroDadosIdentificacao