//Recursos do React/React Native
import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

//Importando AppLoading para load de recursos
import { AppLoading } from 'expo';

//Importando componente de fontes
import * as Font from 'expo-font'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const TelaAutenticacaoPerfil = ({navigation}, props) =>{

    //Interações com state
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    //Funções de direcionamento
    const direcionarBeneficiario = () => {
        navigation.navigate('HomeBeneficiario');
    }

    const direcionarCompanheiro = () => {
        navigation.navigate('HomeCompanheiro');
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
         <Image
          style={styles.image_logo}
          source={require('../../assets/logo/logo_png_light.png')}
         />
         <Text style={styles.texto}>
            Com qual perfil você gostaria de acessar?
         </Text>

         <View style={styles.container_perfis}>
            <View style={styles.container_perfil}>
                <Text style={styles.texto}>BENEFICIÁRIO</Text>
                <TouchableWithoutFeedback onPress={direcionarBeneficiario}>
                    <Image
                        style={styles.image_perfil}
                        source={require('../../assets/images/beneficiario-login.png')}
                    />
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.container_perfil}>
                <Text style={styles.texto}>COMPANHEIRO</Text>
                <TouchableWithoutFeedback onPress={direcionarCompanheiro}>
                <Image
                    style={styles.image_perfil}
                    source={require('../../assets/images/acompanhante-login.png')}
                />
                </TouchableWithoutFeedback>    
            </View>
         </View> 

        <TouchableOpacity
         style={styles.button_info}
        >
         <Image
            style={styles.image_info}
            source={require('../../assets/icons/ajuda_branco.png')}
         />
        </TouchableOpacity>

        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#005E80",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    container_perfis: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    container_perfil: {
        alignItems: "center"
    },
    texto:{
        fontFamily: "montserrat-regular-texto",
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 17,
        marginTop: 0,
        marginBottom: 40,
        marginLeft: 20,
        marginRight: 20
    },
    image_logo: {
        width: 200,
        height: 200,
        alignSelf: "center"
    },
    image_perfil: {
        height: 150,
        width: 150,
        resizeMode: "contain"
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
    }
})

export default TelaAutenticacaoPerfil