import React, {useState, useEffect}  from 'react';
import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const Proposta = ( {route, navigation}, props) =>{

    //O código abaixo mostra a forma de capturar a variável enviada para a outra tela
//const {dataInicio} = route.params;

const confirmacao = () => {

//O código abaixo envia a data selecionada para a próxima tela
    // navigation.navigate('ConfirmacaoAgendamento',
//             {
//                 dataInicio: date
//             })
//console.log('confirmou')
}

  //Fonte de letra
  const [isLoadingComplete, setLoadingComplete, isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been picked: ", new Date(date.nativeEvent.timestamp))
    hideDatePicker();
  };

  //Datetimepicker
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (selectedDate) => {
    
    //Variável que guarda a data e horário em formato de objeto Date
    const currentDate = new Date(selectedDate.nativeEvent.timestamp);
    setShow(Platform.OS === 'ios');
    
    //Atualiza o state
    setDate(currentDate);

    //mostra no console o que foi selecionado
    console.log(currentDate)
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };          

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

  //Iniciando visual
  return (
    <View style={styles.container}>
      <View style={styles.container_card}>
        <Text style={styles.text_title}>QUASE LÁ</Text>
        <Text style={styles.text_card}>
          Nos informe a data e horário de início e término do acompanhamento.
        </Text>
 
        <View style={styles.container_information}>
          <Text style={styles.text_information}>
            Início
          </Text>
          
        <View style={styles.datepicker}>
          <Button
          onPress={showDatepicker} title="Escolha a data para início" />
        </View>
        <View style={styles.datepicker_fim}>
          <Button onPress={showTimepicker} title="Escolha o horário para início" />
        </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={onChange}
            />
          )}

        <Text style={styles.text_fim}>
            Fim
        </Text>
          
   
      <View style={styles.datepicker_fim}>
        <Button onPress={showTimepicker} title="Escolha o horário para o término" />
      </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}

        <Text style={styles.text_pagamento}>
          Forma de Pagamento
        </Text>
        
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
    paddingBottom: 20,
    fontFamily: 'montserrat-negrito',
    textAlign: 'center',
    paddingTop: 20,
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
    fontFamily: 'montserrat-regular-texto',
    textAlign: 'center',
    color: '#005E80',
    letterSpacing: 1,
    marginTop: 20,
  },

  text_fim: {
    fontSize: 20,
    fontFamily: 'montserrat-regular-texto',
    textAlign: 'center',
    color: '#005E80',
    letterSpacing: 1,
    marginBottom: 30,
    paddingTop: 15,
  },

  text_pagamento: {
    fontSize: 20,
    fontFamily: 'montserrat-regular-texto',
    textAlign: 'center',
    color: '#005E80',
    letterSpacing: 1,
    marginTop: 20,
  },

  text_valor: {
    fontSize: 20,
    fontFamily: 'montserrat-regular-texto',
    marginLeft: 50,
    color: '#005E80',
    letterSpacing: 1,
    marginTop: 10,
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
    height: 530,
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
  width: 70,
  height: 70,
  marginLeft: 80,
},

image_card: {
  width: 70,
  height: 70,
  marginLeft: 180,
  marginVertical: -70,
},

image_fim: {
  width: 35,
  height: 35,
  marginLeft: 180,
  marginVertical: -60,
  marginBottom: -5,
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

button_agendar: {
  width: 300,
  height: 50,
  borderColor: '#005E80',
  borderWidth: 2,
  borderRadius: 20,
  marginTop: 20,
  textAlign: "center",
},

});

export default Proposta;