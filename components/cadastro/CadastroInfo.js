//Recursos do React/React Native
import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

//Importando componente de fontes
import * as Font from 'expo-font'

//Importando AppLoading para load de recursos
import { AppLoading } from 'expo';

//Importando LinearGradient do expo-linear-gradient
//Fonte inicial: https://medium.com/@chsvk/react-native-gradient-backgrounds-b9f1f14bfe7b
//Outros detalhes: 
import {LinearGradient} from 'expo-linear-gradient'
/*
<LinearGradient
                colors={['#005E80','#005E80','#005E80','#FFFFFF']}
                style={styles.container_gradiente}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            >
            </LinearGradient>
*/

const TelaCadastroInformacao = ({navigation}, props) =>{

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

            <Text>Legal ter você por aqui ^^</Text>
            <Text>Algumas recomendações antes de começarmos:</Text>
            
            <Text>Esse cadastro deve ter informações do dono desse número</Text>
            <Text>O dono desse número pode ser um idoso ou um parente próximo</Text>

            <Text>Vamos começar! Nos diga quem você é, isso é muito importante pra nós{/* Nome e CPF */}</Text>
            
            <Text>Se precisarmos, como podemos falar contigo? {/* Email e telefone */}</Text>

            <Text>Enviamos um código pro seu número cadastrado só pra confirmar, pode verificar se chegou?{/* Código do SMS */}</Text>
            <Text>Pronto! ^^ Agora é só acessar com o CPF e com esse número quando quiser chamar um profissional</Text>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#005E80",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around"
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
        borderRadius: 60
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

export default TelaCadastroInformacao