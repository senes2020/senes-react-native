import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

//Importando componente de fontes
import * as Font from 'expo-font'

const TesteFontes = () => {

    //Código para carregamento das fontes antes da renderização
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

    return (
        <View style={styles.container}>
          <Text style={styles.titulo}>Montserrat Regular - Título Comum</Text>
          <Text style={styles.titulo_magro}>Montserrat Thin - Título Comum</Text>
          <Text style={styles.titulo_negrito}>Montserrat SemiBold - Título Negrito</Text>
          <Text style={styles.texto}>Montserrat Regular - Textos</Text>
          <Text style={styles.texto}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</Text>
          <TouchableOpacity style={{ backgroundColor: '#DDDDDD'}}><Text>OK</Text></TouchableOpacity>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontFamily: 'space-mono-titulo',
    fontSize: 30,
    textAlign: "center"
  },
  titulo_negrito: {
    fontFamily: 'space-mono-negrito',
    fontSize: 30
  },
  titulo_magro: {
    fontFamily: 'space-mono-titulo-magro',
    fontSize: 30
  },
  texto: {
    fontFamily: 'montserrat-regular-texto',
    fontSize: 20,
    lineHeight: 30  
  }
});


export default TesteFontes