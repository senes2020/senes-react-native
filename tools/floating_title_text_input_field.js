import React, { Component } from 'react';
import { View, Animated, StyleSheet, TextInput } from 'react-native';
import { string, func, object, number } from 'prop-types';

//Importando componente de fontes
import * as Font from 'expo-font'

export class FloatingTitleTextInputField extends Component {  

  componentDidMount(){
    Font.loadAsync({
        'montserrat-regular-texto': require('../assets/fonts/montserrat/Montserrat-Regular.ttf'),
        'space-mono-titulo': require('../assets/fonts/montserrat/Montserrat-Light.ttf'),
        'space-mono-titulo-magro': require('../assets/fonts/montserrat/Montserrat-Thin.ttf'),
        'space-mono-negrito': require('../assets/fonts/montserrat/Montserrat-SemiBold.ttf')
    });
  }

  static propTypes = {
    attrName: string.isRequired,
    title: string.isRequired,
    value: string.isRequired,
    updateMasterState: func.isRequired,
    keyboardType: string,
    titleActiveSize: number, // to control size of title when field is active
    titleInActiveSize: number, // to control size of title when field is inactive
    titleActiveColor: string, // to control color of title when field is active
    titleInactiveColor: string, // to control color of title when field is active
    titleActiveAlignment: string,
    titleInactiveAlignment: string,
    titleActiveMargin: string,
    titleInactiveMargin: string,
    textInputStyles: object,
    otherTextInputProps: object,
  }

  
  static defaultProps = {
    keyboardType: 'default',
    titleActiveSize: 11.5,
    titleInActiveSize: 15,
    titleActiveColor: '#FFFFFF',
    titleInactiveColor: '#FFFFFF',
    titleActiveAlignment: "left",
    titleInactiveAlignment: "center",
    titleActiveMargin: "30px",
    titleInactiveMargin: "0",
    textInputStyles: {}, 
    otherTextInputAttributes: {},
  }

  constructor(props) {
    super(props);
    const { value } = this.props;
    this.position = new Animated.Value(value ? 1 : 0);
    this.state = {
      isFieldActive: false,
    }
  }

  _handleFocus = () => {
    if (!this.state.isFieldActive) {
      this.setState({ isFieldActive: true });
      Animated.timing(this.position, {
        toValue: 1,
        duration: 150,
      }).start();
    }
  }

  _handleBlur = () => {
    if (this.state.isFieldActive && !this.props.value) {
      this.setState({ isFieldActive: false });
      Animated.timing(this.position, {
        toValue: 0,
        duration: 150,
      }).start();
    }
  }

  _onChangeText = (updatedValue) => {
    const { attrName, updateMasterState } = this.props; 
    updateMasterState(attrName, updatedValue);
  }

  _returnAnimatedTitleStyles = () => {
    const { isFieldActive } = this.state;
    const {
      titleActiveColor, titleInactiveColor, titleActiveSize, titleInActiveSize, titleActiveAlignment, titleInactiveAlignment,
      titleActiveMargin, titleInactiveMargin
    } = this.props;
  
    return {
      top: this.position.interpolate({
        inputRange: [0, 1],
        outputRange: [14, 0],
      }),
      fontSize: isFieldActive ? titleActiveSize : titleInActiveSize,
      color: isFieldActive ? titleActiveColor : titleInactiveColor,
      textAlign: isFieldActive ? titleActiveAlignment : titleInactiveAlignment,
      marginLeft: isFieldActive ? titleActiveMargin : titleInactiveMargin
    }
  }

  render() {
    return (
      <View style = {Styles.container}>
        <Animated.Text
          style = {[Styles.titleStyles, this._returnAnimatedTitleStyles()]}
        >
          {this.props.title}
        </Animated.Text>
        <TextInput
          value = {this.props.value}
          style = {[Styles.textInput, this.props.textInputStyles]}
          underlineColorAndroid = 'transparent'
          onFocus = {this._handleFocus}
          onBlur = {this._handleBlur}
          onChangeText = {this._onChangeText}
          keyboardType = {this.props.keyboardType}
          {...this.props.otherTextInputProps}
        />
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  container: {
    textAlign: "center",
    borderRadius: 3,
    borderStyle: 'solid',
    borderColor: "transparent",
    borderWidth: 0.5,
    height: 50
  },
  textInput: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 5,
    fontFamily: 'montserrat-regular-texto',
    color: '#FFFFFF',
  },
  titleStyles: {
    fontFamily: 'montserrat-regular-texto',
  }
})