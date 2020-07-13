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

class DateCal extends Component {
  
  statetime = {
    yourValue: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      data: new Date("2020/06/30"),
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
        
            <TextInput style={styles.horario_inicio}
               underlineColorAndroid = "transparent"
               placeholder = "Digite um horário para início"
               placeholderTextColor = "#fff"
               autoCapitalize = "none"
               keyboardType="numeric"
               value={this.state.horarioInicio}
               onChangeText={(texto) => this.setState({horarioInicio:texto})}
               maxLength={5}
               >
            </TextInput>

            <TextInput style={styles.horario_fim}
               underlineColorAndroid = "transparent"
               placeholder = "Digite um horário para término"
               placeholderTextColor = "#fff"
               keyboardType="numeric"
               value={this.state.horarioFim}
               onChangeText={(texto) => this.setState({horarioFim:texto})}
               maxLength={5}>
            </TextInput>

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
    width: 270,
    paddingTop: 30,
    marginLeft: 50,
  },
   
  horario_fim: {
    fontSize: 19,
    color: '#fff',
    letterSpacing: 1,
    width: 300,
    paddingTop: 30,
    marginLeft: 40,
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
    marginTop: 50,
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