import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { format, isThisSecond } from "date-fns";
import Icon from "react-native-vector-icons/FontAwesome";
import DateTimePicker from "@react-native-community/datetimepicker";
import { TextInput } from "react-native-gesture-handler";
import FloatingLabelInput from "../tools/FloatingLabelInputWhite";

class DateCal extends Component {
  
  statetime = {
    yourValue: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: new Date(),
      confirmDisabled: true,
      TextInputValueHolder: ''
    };
    this.isIos = Platform.OS === "ios";
  }
 
  validado = () => {
    const { data } = this.state;
    if (!data) {
      Alert.alert("Preencha a data, por favor.");
      return false;
    }
    return true;
  };

  handlerData = (e, dataSel) => {
    if (dataSel) {
      const formatedData = format(dataSel, "dd/MM/yyyy");
      console.log(formatedData);
      this.setState({
        showDatePicker: this.isIos ? true : false,
        data: dataSel,
        confirmDisabled: false,
      });
    }
    console.log(dataSel);
  };

  //Função para aplicar máscara do horario e setar no state
  setarHorario = (texto, tempo) => {

    //Aplicando máscara de CPF
    let novoTexto = texto.replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
    .replace(/(\d{2})(\d)/, '$1:$2') //Coloca o : após 2 dígitos

    //Setando no state
    if(tempo == 'inicio'){
      this.setState({horarioInicio:novoTexto})
      console.log(texto, tempo)
    }else if(tempo == 'termino'){
      this.setState({horarioFim:novoTexto})
    }
}

  render() {
    const { showDatePicker } = this.state;
    const { navigation } = this.props;
    const { horarioInicio }  = this.state;
    const { horarioFim }  = this.state;

    const navegar = () => {
      navigation.navigate('Proposta', {dataInicio: this.state.data, 
                    horarioInicio: this.state.horarioInicio,
                    horarioFim: this.state.horarioFim})
    }

    return (
      <KeyboardAvoidingView
        behavior={this.isIos ? "padding" : "height"}
        enabled
      >
        <View style={styles.container}>
          <View style={styles.elementos}>
          <View style={styles.icon}>
            <TouchableOpacity
              onPress={() => navigation.pop(1)}
            >
              <Icon style={styles.icon} name={"close"} size={35} color="#FFF" />
            </TouchableOpacity>
            </View>
            <View  style={styles.container_data}>
            <Text style={styles.text}>
              Selecione a data que gostaria para o acompanhamento, por favor.
            </Text>
            {!this.isIos && (
              <TouchableOpacity
                style={{ flexDirection: "row", marginTop: 16 }}
                onPress={() => {
                  this.setState({ showDatePicker: true });
                }}
              >
                <Icon
                  style={{ alignSelf: "center" }}
                  name={"calendar"}
                  size={50}
                  color="#FFF"
                />
              </TouchableOpacity>
            )}
             <View />
            {showDatePicker && (
               <DateTimePicker
                style={{ width: "100%", color: "#FFF" }}
                textColor="#FFFFFF"
                value={this.state.data}
                locale="pt-BR"
                mode="date"
                is24Hour={true}
                display="spinner"
                onChange={this.handlerData}
               />
            )}
            <Text onPress={() => {
                this.setState({ showDatePicker: true });
              }} style={styles.data} value={this.state.data}>
              {format(this.state.data, "dd/MM/yyyy")}
            </Text>
            </View>
            
            <View style={{marginTop: 20}}>
              <Text  style={{color: 'white', marginLeft: 30}}>Digite um horário para início: </Text>
              <TextInput style={styles.horario_inicio}
                underlineColorAndroid = "white"
                placeholder = "Ex: 14:30"
                placeholderTextColor = "#d1d1d1"
                autoCapitalize = "none"
                value={this.state.horarioInicio}
                keyboardType={'numeric'}
                onChangeText={(texto) => this.setarHorario(texto, 'inicio')}
                maxLength={5}
                >
              </TextInput>
            </View>

            <View style={{marginTop: 20}}>
              <Text  style={{color: 'white', marginLeft: 30}}>Digite um horário para término: </Text>  
              <TextInput style={styles.horario_fim}
                underlineColorAndroid = "white"
                placeholder = "Ex: 17:30"
                placeholderTextColor = "#d1d1d1"
                value={this.state.horarioFim}
                keyboardType={'numeric'}
                onChangeText={(texto) => this.setarHorario(texto, 'termino')}
                maxLength={5}>
              </TextInput>
            </View>

              <TouchableOpacity
                style={styles.button_agendar} onPress={navegar}>
                <Text style={styles.text_information}>
                  Continuar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
      </KeyboardAvoidingView>
    );
  }
}

//Estilização
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#B0C4DE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    marginLeft: 10,
    marginTop: 10,
  },

  text: {
    color: '#fff',
    fontSize: 22,
    textAlign: "center",
    letterSpacing: 1,
    paddingTop: 30,
    marginBottom: 30,
    marginRight: 20,
    marginLeft: 20
  },

  data: {
    color: '#fff',
    fontSize: 18,
    paddingTop: 20,
    letterSpacing: 1,
  },

  container_data: {
    alignItems: 'center',
  },
  
  horario_inicio: {
    fontSize: 19,
    color: '#fff',
    letterSpacing: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
    paddingBottom: 15
  },
   
  horario_fim: {
    fontSize: 19,
    color: '#fff',
    letterSpacing: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 5,
    paddingBottom: 15
  },

  elementos: {
    width: 380,
    height: 580,
    borderWidth: 1,
    borderColor: '#fff',
    marginTop: 20,
    backgroundColor: '#005E80',
  },

  button_agendar: {
    width: 250,
    height: 50,
    borderColor: '#fff',
    backgroundColor: '#005e80',
    borderWidth: 2,
    borderRadius: 15,
    margin: 30,
    textAlign: "center",
    marginLeft: 60,
  },

  text_information: {
    fontSize: 20,
    textAlign: 'center',
    color: '#fff',
    letterSpacing: 1,
    marginTop: 8,
  },
})

export default DateCal;