//Recursos do React/React Native
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image} from 'react-native'

//Importando componente de fontes
import * as Font from 'expo-font'

//Importando AppLoading para load de recursos
//e LinearGradient para background
import { AppLoading } from 'expo'

//Importando input com label flutuante
import FloatingLabelInput from '../tools/FloatingLabelInputBlue'
import { TouchableOpacity } from 'react-native-gesture-handler'

const TelaCadastroDadosContato = ({route, navigation}, props) => {

    const prosseguirCadastro = () =>{
        navigation.navigate('CadastroConfirmacaoNumero',
        {
            emailDigitado: email
        })
    }

    const {nomeDigitado} =  route.params;

    //Interações com state
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');

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
            <Text style={styles.texto}>Muito prazer, {nomeDigitado}! ^^</Text>
            <Text style={styles.texto}>Se precisarmos, como podemos falar contigo?</Text>
            <FloatingLabelInput
                label="Digite seu melhor email"
                value={email ? email : ''}
                onChangeText={(texto) => setEmail(texto)}
                
            />
            <FloatingLabelInput
                label="Digite seu número de celular"
                value={celular ? celular : ''}
                onChangeText={(texto) => setCelular(texto)}
                maxLength={11}
                keyboardType={'numeric'}
            />
            <Image
                style={styles.image}
                source={require('../../assets/icons/contact.png')}
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
        width: 250,
        height: 250,
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