//Recursos do React/React Native
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native'

//Importando componente de fontes
import * as Font from 'expo-font'

//Importando AppLoading para load de recursos
//e LinearGradient para background
import { AppLoading } from 'expo'

//Importando input com label flutuante
import FloatingLabelInput from '../tools/FloatingLabelInputBlue'
import { TouchableOpacity } from 'react-native-gesture-handler'

//Importando serviços
import { cadastrarUsuario } from '../../services/cadastro-service'

const TelaCadastroDadosContato = ({route, navigation}, props) => {

    //Interações com state
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [loading, setLoading] = useState(false);

    //Coleta de dados digitados em outra tela
    const {nomeDigitado, cpfDigitado} =  route.params;

    const prosseguirCadastro = async(e) => {

        //Atualizando tela com loading
        setLoading(true);

        //Montagem de usuário para cadastro
       const usuario = {
            cpfCadastro: cpfDigitado,
            emailCadastro: email,
        }

        try{
            
            //Realiza a solicitação do serviço de cadastro
            const response = await cadastrarUsuario(usuario)

            //Atualizando tela sem loading
            setLoading(false);
        
            //Se a resposta voltar com status 200 OK, 
            //retira a informação de email da promessa
            //e seta o email no state
            if(response.ok){

                //Enviar dados para o Spring cadastrar o novo beneficiário e enviar email
                //Pasar para próxima página coletando o email
                navigation.navigate('CadastroConfirmacaoEmail',
                {
                    nomeDigitado: nomeDigitado,
                    emailDigitado: email,
                    celularDigitado: celular
                })

            }else{
                console.log('não vai rolar, kirido')
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

            <Text style={styles.texto}>Muito prazer, {nomeDigitado}! ^^</Text>
            <Text style={styles.texto}>Se precisarmos, como podemos falar contigo?</Text>
            <FloatingLabelInput
                label="Digite seu melhor email"
                value={email ? email : ''}
                onChangeText={(texto) => setEmail(texto)}
                editable={loading ? false: true}
            />
            <FloatingLabelInput
                label="Digite seu número de celular"
                value={celular ? celular : ''}
                onChangeText={(texto) => setCelular(texto)}
                maxLength={11}
                keyboardType={'numeric'}
                editable={loading ? false: true}
            />
            <Image
                style={styles.image}
                source={require('../../assets/icons/contact.png')}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={prosseguirCadastro}
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

export default TelaCadastroDadosContato