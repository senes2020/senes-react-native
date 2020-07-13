import { StyleSheet, Text, View, Image, Button } from 'react-native';
import * as Font from 'expo-font';
import React, {useState, useEffect}  from 'react';
import { AppLoading } from 'expo';

const ConclusaoAgendamento = ( {navigation}, props) =>{

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Proposta')
        }, 4000)
    })


   //Fonte de letra
   const [isLoadingComplete, setLoadingComplete] = useState(false);

   //Fonte
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

    return(
        <View  style={styles.container}>
            <Text style={styles.text_titulo}>
                ENVIAMOS A PROPOSTA DE AGENDAMENTO PARA O COMPANHEIRO (A)!
            </Text>
            <Image
            style={styles.image}
            source={require('../../assets/images/confirmado.png')}
          />
           <Text style={styles.text_frase}>
                Você será redirecionado...
            </Text>
        </View>
    )

}

//Estilização
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    image: {
        width: 300,
        height: 300,
        marginTop: 70,
        marginBottom: 80,
    },

    text_titulo: {
        textAlign: "center",
        fontSize: 20,
        fontFamily: 'montserrat-regular-texto',
        color: '#005E80',
    },

    text_frase: {
        textAlign: "center",
        fontSize: 16,
        fontFamily: 'montserrat-regular-texto',
    },
})

export default ConclusaoAgendamento;