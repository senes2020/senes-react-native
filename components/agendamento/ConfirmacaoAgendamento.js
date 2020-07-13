import React, {useState, useEffect}  from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { TouchableOpacity, TextInput } from 'react-native-gesture-handler';
import Icon from "react-native-vector-icons/FontAwesome";
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import Proposta from './Proposta';
import { format } from "date-fns";

const ConfirmacaoAgendamento = ( {route, navigation}, props) =>{

   const {dataInicio, horarioInicio, horarioFim} = route.params;

    const conclusaoAgendamento = () => {
      navigation.navigate('ConclusaoAgendamento');
    }

    const voltar = () => {
      navigation.navigate('Proposta');
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
        <TouchableOpacity style={styles.close}
        onPress={voltar}
        >
        <Image 
          source={require('../../assets/images/close.png')}/>
        </TouchableOpacity>
        <Text style={styles.text_title}>CONFIRMAÇÃO</Text>
        <Text style={styles.text_card}> 
          Confirme se as informações estão corretas.
        </Text>
        <Text style={styles.text_nome}>
            Nome do (a) Companheiro(a):  
          </Text>
          <Text style={styles.text_profissional}>
          Stephanie Toledo
          </Text>
        <View style={styles.container_information}>
          <View style={styles.container_inicio}>
            <Text style={styles.text_information}>
              Início
            </Text>
          
          <Image
            style={styles.image}
            source={require('../../assets/images/inicio.png')}
          />
        <View style={styles.date}>
          <Text style={styles.dataescolhida}>
            Data: {format(dataInicio, "dd/MM/yyyy")}
          </Text>
          <Text style={styles.text_horainicio}>Horário de início: {horarioInicio}</Text>
         </View>

        <Text style={styles.text_information_fim}>
            Fim
        </Text>
          <Image
            style={styles.image_fim}
            source={require('../../assets/images/fim.png')}
          />
        <View style={styles.datefim}>
          <Text style={styles.text_horafim}>Horário do término: {horarioFim}</Text>
        </View>
        <Text style={styles.text_carro}>
          Possui carro?
        </Text>  
        <Text style={styles.text_valor}>
          Valor Total: R$ 
        </Text>
      </View>
    </View>
    </View>
      <TouchableOpacity
        style={styles.button_agendar}
        onPress={conclusaoAgendamento}
        >
        <Text style={styles.text_agendar}>CONFIRMAR</Text>
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
    paddingBottom: 20,
    fontFamily: 'montserrat-negrito',
    textAlign: 'center',
    color: '#005E80',
  },

  text_card: {
    fontSize: 18,
    fontFamily: 'montserrat-negrito',
    textAlign: 'center',    
    height: 60,
  },

  text_information: {
    fontSize: 20,
    fontFamily: 'montserrat-regular-texto',
    textAlign: 'center',
    color: '#005E80',
    letterSpacing: 1,
    paddingTop: 8,
  },

  container_inicio: {
    marginTop: 10,
  },

  text_information_fim: {
    fontSize: 20,
    fontFamily: 'montserrat-regular-texto',
    textAlign: 'center',
    color: '#005E80',
    letterSpacing: 1,
    marginTop: 20,
  },

  text_nome: {
    fontSize: 18,
    fontFamily: 'montserrat-regular-texto',
    textAlign: 'center',
    color: 'black',
    letterSpacing: 1,
    marginBottom: 10,
  },

  text_profissional: {
    fontSize: 21,
    fontFamily: 'montserrat-negrito',
    textAlign: 'center',
    color: '#005E80',
    letterSpacing: 1,
  },

  text_carro: {
    fontSize: 20,
    fontFamily: 'montserrat-regular-texto',
    textAlign: 'center',
    color: '#005E80',
    letterSpacing: 1,
    marginTop: 20,
  },

  text_valor: {
    fontSize: 20,
    fontFamily: 'montserrat-negrito',
    marginLeft: 30,
    color: 'black',
    letterSpacing: 1,
    marginTop: 30,
  },

  container_card: {
    backgroundColor: "#fff",
    height: 550,
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

image_fim: {
  width: 35,
  height: 35,
  marginLeft: 180,
  marginVertical: -30,
},

text_agendar: {
  fontSize: 18,
  fontFamily: 'montserrat-regular-texto',
  textAlign: "center",
  color: '#005E80',
  letterSpacing: 1,
  marginTop: 10,
},

button_agendar: {
  width: 300,
  height: 50,
  borderColor: '#005E80',
  borderWidth: 2,
  borderRadius: 20,
  marginTop: 10,
  textAlign: "center",
},

datepicker: {
  width: 260,
  marginTop: 30,
  marginBottom: 10,
  alignSelf: "center",
},

dataescolhida: {
  fontSize: 19,
  textAlign: 'center',
},

date: {
  backgroundColor: "#B0C4DE",
  borderWidth: 1,
  borderRadius: 7,
  height: 70,
  width: 240,
  marginLeft: 35,
  paddingTop: 4,
  marginTop: 30,
},

datefim: {
  backgroundColor: "#B0C4DE",
  borderWidth: 1,
  borderRadius: 7,
  height: 40,
  width: 260,
  marginLeft: 30,
  paddingTop: 4,
  marginTop: 30,
},

datepicker_fim: {
  width: 280,
  marginBottom: 10,
  alignSelf: "center",
},

text_horainicio: {
  marginTop: 10,
  textAlign: 'center',
  fontSize: 20,
},

text_horafim: {
  marginTop: 3,
  textAlign: 'center',
  fontSize: 20,
},

close: {
  marginLeft: 5,
  marginBottom: -10,
  paddingTop: -60,
},

});

export default ConfirmacaoAgendamento;