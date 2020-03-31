//Recursos do React/React Native
import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

//Importando componente de fontes
import * as Font from 'expo-font'

//Importando o Slideshow
import SliderBoxComponent from './SliderBox'

//Importando AppLoading para load de recursos
import { AppLoading} from 'expo';

const PaginaInicial = ({navigation}, props) =>{

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
                'montserrat-regular-texto': require('../assets/fonts/montserrat/Montserrat-Regular.ttf'),
                'montserrat-titulo': require('../assets/fonts/montserrat/Montserrat-Light.ttf'),
                'montserrat-titulo-magro': require('../assets/fonts/montserrat/Montserrat-Thin.ttf'),
                'montserrat-negrito': require('../assets/fonts/montserrat/Montserrat-SemiBold.ttf')
            }),
        ]);
    }

    function handleLoadingError(error) {
    console.warn(error);
    }

    function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
    }

    const autenticar = (e) =>{
        navigation.navigate('Autenticacao')
    }

    const cadastrar = (e) =>{
        navigation.navigate('CadastroIntro')
    }
    
    return (
        <View style={styles.container}>

            <View style={styles.container_logo}>
                <Image
                    style={styles.image_logo}
                    source={require('../assets/logo/logo_slogan_light.png')}
                />
            </View>

            <SliderBoxComponent style={styles.container_slide}/>

            <View style={styles.container_acoes}>

                <View style={styles.container_acao}>
                    <TouchableOpacity onPress={autenticar}>
                        <View style={styles.container_link}>
                            <View style={styles.button_circular}>
                                <Image
                                    style={styles.button_imagem}
                                    source={require('../assets/icons/login.png')}
                                />
                            </View>
                            <Text style={styles.descricao_texto}>LOGIN</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.container_acao}>
                    <TouchableOpacity onPress={cadastrar}>
                        <View style={styles.container_link}>
                            <View style={styles.button_circular}>
                                <Image
                                    style={styles.button_imagem}
                                    source={require('../assets/icons/cadastro.png')}
                                />
                            </View>
                            <Text style={styles.descricao_texto}>CADASTRO</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.container_info}>
                    <TouchableOpacity>
                        <View style={styles.container_link}>
                            <View style={styles.button_circular}>
                                <Text style={styles.button_texto}>i</Text>
                            </View>
                            <Text style={styles.descricao_texto}>INFORMAÇÕES</Text>
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 4,
        justifyContent: 'space-between',
        flexDirection: "column"
    },
    container_logo: {
        backgroundColor: "#005E80",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    container_slide: {
        flex: 3
    },
    container_acoes: {
        flex: 0.5,
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: "space-around"
    },
    container_acao:{
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        alignContent: "center"
    },
    container_info: {
        borderLeftWidth: 2,
        borderLeftColor: "#4E5457",
        paddingLeft: 20,
        alignItems: "center",
        alignContent: "center",
        alignSelf: "center"
    },
    image_logo: {
        height: 100,
        resizeMode: "contain"
    },
    image_carousel: {
        resizeMode: "contain"
    },
    button_circular: {
        height: 45,
        width: 45,
        borderColor: "#005E80",
        borderWidth: 2,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button_texto:{
        fontFamily: "montserrat-negrito",
        color: "#005E80",
        textAlign: "center",
        fontSize: 20
    },
    button_imagem: {
        height: 25,
        resizeMode: "contain"
    },
    descricao_texto: {
        fontFamily: "montserrat-negrito",
        color: "#005E80",
        textAlign: "center",
        fontSize: 14,
        marginTop: 10
    },
    container_link: {
        alignItems: "center",
        alignContent: "center"
    }
})

export default PaginaInicial