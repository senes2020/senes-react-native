import React, { useState, useEffect } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { View, Text, StyleSheet } from 'react-native';

const CustomOverlay = (props) => {

  let {dados, visibilidade} = props;

  //Função que chama método da função pai para não tornar visível o Overlay 
  //quando houver toque no fundo da tela
  const toggleOverlay = () => {
    visibilidade();
  };

  return (
    <View>
      <Overlay onBackdropPress={toggleOverlay}>
        <Text style={styles.texto_bio}>{dados}</Text>
      </Overlay>
    </View>
  );
}

const styles = StyleSheet.create({
  texto_bio: {
    padding: 20
  }
})

export default CustomOverlay