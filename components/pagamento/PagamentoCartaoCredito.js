import React, { Component } from "react";
import { StyleSheet, View, Switch, TouchableOpacity, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";


export default class CartaoCredito extends Component {
  state = { useLiteCreditCardInput: false };

  _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));
  _onFocus = (field) => console.log("focusing", field);
  _setUseLiteCreditCardInput = (useLiteCreditCardInput) => this.setState({ useLiteCreditCardInput });

  render() {
    const { navigation } = this.props;
    const navegar = () => {
        navigation.navigate('Proposta',  
        {
            metodoPagamento: 'cartao'
        });
    }
    return (
      <View style={s.container}>
         <TouchableOpacity
              onPress={() => navigation.pop(1)}
            >
              <Icon style={s.icon} name={"close"} size={35} color="#FFF" />
            </TouchableOpacity>
        <Switch
          style={s.switch}
          onValueChange={this._setUseLiteCreditCardInput}
          value={this.state.useLiteCreditCardInput} />

        { this.state.useLiteCreditCardInput ?
          (
            <LiteCreditCardInput
              autoFocus
             
              inputStyle={s.input}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onFocus={this._onFocus}
              onChange={this._onChange} />
          ) : (
            <CreditCardInput
              autoFocus

              requiresName
              requiresCVC
              requiresPostalCode

              cardScale={1.0}
              labelStyle={s.label}
              inputStyle={s.input}
              validColor={"black"}
              invalidColor={"red"}
              placeholderColor={"darkgray"}

              onFocus={this._onFocus}
              onChange={this._onChange} />
          )
        }
        <TouchableOpacity
          style={s.button_agendar} onPress={navegar}>
          <Text style={s.text_information}>
            Continuar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}


const s = StyleSheet.create({
    switch: {
      alignSelf: "center",
      marginTop: 60,
      marginBottom: 20,
    },
    container: {
      backgroundColor: "#DCDCDC",
      height: 700,
    },
    label: {
      color: "black",
      fontSize: 12,
    },
    input: {
      fontSize: 16,
      color: "black",
    },
    button_agendar: {
      width: 250,
      height: 50,
      borderColor: '#005E80',
      borderWidth: 2,
      borderRadius: 15,
      marginTop: 100,
      textAlign: "center",
      marginLeft: 80,
    },
  
    text_information: {
      fontSize: 20,
      textAlign: 'center',
      color: '#005E80',
      letterSpacing: 1,
      marginTop: 8,
    },
    close: {
      marginLeft: 10,
      marginBottom: -10,
      paddingTop: 60,
    },
    icon: {
      paddingTop: 50,
      marginLeft: 20,
      color: '#005E80',
    }
  });
