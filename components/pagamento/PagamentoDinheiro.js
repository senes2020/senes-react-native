import React, {useState, useEffect, Component}  from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const PagamentoDinheiro = ( {route, navigation}, props) => {

    const voltar = () => {
        navigation.navigate('Proposta',  
                            {
                                metodoPagamento: 'dinheiro'
                            });
      }

     //Fonte de letra
  const [isLoadingComplete, setLoadingComplete] = useState(false);

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
        <View style={styles.container_informations}>
            <Text style={styles.text_title}>Pague direto ao (a) Companheiro(a)!</Text>
            <Text style={styles.text_information}>Após finalizar sua proposta de agendamento,
                pague o valor total diretamente ao profissional.
            </Text>    
            <Text style={styles.text}>Agora, vamos continuar o agendamento! ^^</Text>
            <TouchableOpacity
                style={styles.button_agendar}
                onPress={voltar}
                >
                <Text style={styles.text_agendar}>CONTINUAR</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#dcdcdc',
      alignItems: 'center',
      justifyContent: 'center',
    },
    container_informations:{
        height: 600,
    },
    text_title:{
        fontSize: 19,
        paddingBottom: 40,
        paddingTop: 80,
        fontFamily: 'montserrat-negrito',
        textAlign: 'center',
        color: '#005E80',
    },
    text_information:{
        fontSize: 18,
        fontFamily: 'montserrat-regular-texto',
        textAlign: 'center',
        height: 150,  
        width: 300,
        marginTop: 50,
        marginLeft: 30,
        borderRadius: 10,
        backgroundColor: '#00838f',
        color: '#fff',
        paddingTop: 30,
    },
    text:{
        fontSize: 18,
        fontFamily: 'montserrat-regular-texto',
        textAlign: 'center',
        width: 300,
        marginTop: 60,
        marginLeft: 30,
    },
    image:{
        marginLeft: 150,
        marginTop: 100,
    },
    button_agendar: {
        width: 230,
        height: 50,
        backgroundColor: '#005E80',
        borderRadius: 15,
        marginTop: 60,
        textAlign: "center",
        marginLeft: 60,
      },
      text_agendar: {
        fontSize: 19,
        fontFamily: 'montserrat-regular-texto',
        textAlign: "center",
        color: '#fff',
        letterSpacing: 1,
        marginTop: 13,
      },
})

export default PagamentoDinheiro;
