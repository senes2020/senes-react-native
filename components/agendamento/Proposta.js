import React, {useState, useEffect, Component}  from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const Proposta = ( {route, navigation}, props) => {

const confirmacao = () => {

  navigation.navigate('ConfirmacaoAgendamento', {dataInicio: route.params.dataInicio, 
                  horarioInicio: route.params.horarioInicio, horarioFim: route.params.horarioFim})
}

const datecal = () => {
  navigation.navigate('DateCal');
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

  //Iniciando visual
  return (
    <View style={styles.container}>
      <View style={styles.container_card}>
        <Text style={styles.text_title}>QUASE LÁ</Text>
        <Text style={styles.text_card}> 
          Nos informe a data e horário de início e término do acompanhamento.
        </Text>
  
        <View style={styles.container_information}>
        <TouchableOpacity
         style={styles.button_date}
          onPress={datecal}>
          <Text style={styles.text_information}>
            Toque para selecionar data e horário
          </Text>
        </TouchableOpacity>
        <Text style={styles.text_pagamento}>
          Forma de Pagamento
        </Text>
        <Image
            style={styles.image_money}
            source={require('../../assets/images/dinheiro-icone.png')}
          />
           <Image
            style={styles.image_card}
            source={require('../../assets/images/card.png')}
          />
        </View>
        <Text style={styles.text_valor}>
          Valor Total: R$
        </Text>
      </View>
      <TouchableOpacity
        style={styles.button_agendar}
        onPress={confirmacao}
        >
        <Text style={styles.text_agendar}>AGENDAR</Text>
      </TouchableOpacity>
    </View>
  );
}

//Estilização
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textTitle: {
    fontSize: 27,
    fontFamily: 'montserrat-regular-texto',
    paddingBottom: 20,
  },

  text_title: {
    fontSize: 21,
    paddingBottom: 40,
    fontFamily: 'montserrat-negrito',
    textAlign: 'center',
    paddingTop: 40,
    color: '#005E80',
  },

  text_card: {
    fontSize: 18,
    fontFamily: 'montserrat-titulo',
    textAlign: 'center',
    height: 60, 
  },

  text_information: {
    fontSize: 20,
    fontFamily: 'montserrat-negrito',
    textAlign: 'center',
    color: '#005E80',
    letterSpacing: 1,
  },

  text_fim: {
    fontSize: 20,
    fontFamily: 'montserrat-regular-texto',
    textAlign: 'center',
    color: '#005E80',
    letterSpacing: 1,
    marginBottom: 30,
    paddingTop: 10,
  },

  text_pagamento: {
    fontSize: 20,
    fontFamily: 'montserrat-regular-texto',
    textAlign: 'center',
    color: '#005E80',
    letterSpacing: 1,
    marginTop: 40,
  },

  text_valor: {
    fontSize: 20,
    fontFamily: 'montserrat-negrito',
    marginLeft: 80,
    color: '#005E80',
    letterSpacing: 1,
    marginTop: -60,
  },

  text_agendar: {
    fontSize: 18,
    fontFamily: 'montserrat-regular-texto',
    textAlign: "center",
    color: '#005E80',
    letterSpacing: 1,
    marginTop: 10,
  },

  container_card: {
    backgroundColor: "#fff",
    height: 510,
    width: 380,
    borderWidth: 1,
    borderColor: '#005E80',
    marginTop: 30,
  },

  container_information: {
    height: 350,
    width: 300,
    alignSelf: 'center',
  },

  container_btn: {
    width: 300,
    top: 20,
    borderRadius: 80,
  },

  image: {
    width: 20,
    height: 20,
    marginLeft: 190,
    marginVertical: -20,
},

image_money: {
  width: 65,
  height: 65,
  marginLeft: 70,
  marginTop: 30,
},

image_card: {
  width: 95,
  height: 95,
  marginLeft: 170,
  marginVertical: -80,
},

image_fim: {
  width: 35,
  height: 35,
  marginLeft: 180,
},

datepicker: {
  marginTop: 30,
  marginBottom: 10,
},

datepicker_fim: {
  width: 280,
  alignSelf: "center",
  paddingTop: 10,
},

button_date: {
  width: 300,
  height: 50,
  borderRadius: 20,
  marginTop: 20,
  textAlign: "center",
},

button_agendar: {
  width: 250,
  height: 50,
  borderColor: '#005E80',
  backgroundColor: '#fff',
  borderWidth: 1.5,
  borderRadius: 15,
  marginTop: 25,
  textAlign: "center",
}

});

export default Proposta;