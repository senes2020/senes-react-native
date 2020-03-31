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

const TelaCadastroConclusao = ({route, navigation}, props) => {

    const retornarIndex = () =>{
        navigation.navigate('Index')
    }

    const acessarHome = () => {
        navigation.navigate('Autenticacao')
    }

    //Interações com state
    const [isLoadingComplete, setLoadingComplete] = useState(false);

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
            <Text style={styles.texto}>Pronto! ^^ Agora é só acessar com o CPF e com esse número quando quiser chamar um profissional</Text>
            
            <Image
                style={styles.image}
                source={require('../../assets/icons/check.png')}
            />
            <View style={styles.container_acoes}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={retornarIndex}
                    >
                    <Text style={styles.button_texto}>VOLTAR PARA O INÍCIO</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button_app}
                    onPress={acessarHome}
                    >
                    <Text style={styles.button_app_texto}>ACESSAR O APP</Text>
                </TouchableOpacity>
            </View>
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
    container_acoes: {
        flexDirection: 'row',
        justifyContent: 'space-around'
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
        borderColor: "#005E80",
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    button_app: {
        height: 50,
        borderColor: "#005E80",
        backgroundColor: "#005E80",
        color: '#FFFFFF',
        borderWidth: 2,
        borderRadius: 20,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    button_texto:{
        fontFamily: "montserrat-regular-texto",
        color: "#005E80",
        textAlign: "center",
        fontSize: 14,
        padding: 5
    },
    button_app_texto:{
        fontFamily: "montserrat-regular-texto",
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 14,
        padding: 5
    },

})

export default TelaCadastroConclusao