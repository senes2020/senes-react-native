//Recursos do React/React Native
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image} from 'react-native'

//Importando componente de fontes
import * as Font from 'expo-font'

//Importando AppLoading para load de recursos
//e LinearGradient para background
import { AppLoading } from 'expo'

const TelaCadastroIntro = ({navigation}, props) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('CadastroInformacoes')
        }, 3000)
    })

    const avancarTela = () => {
        navigation.navigate('CadastroInformacoes')
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
        <View style={styles.container} onPress={avancarTela}>
            <Text style={styles.texto}>Legal ter você por aqui ^^</Text>
            <Text style={styles.texto}>Aqui vão algumas recomendações antes de começarmos</Text>
            <Image
                style={styles.image}
                source={require('../../assets/icons/instrucoes.png')}
            />
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
    }
})

export default TelaCadastroIntro