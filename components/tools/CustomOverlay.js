import React, { useState } from 'react';
import { Button, Overlay } from 'react-native-elements';
import { View, Text } from 'react-native';

const CustomOverlay = (props) => {
  const [visible, setVisible] = false;
  const [dados, setDados] = props.dados;

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  //<Button title="Open Overlay" onPress={toggleOverlay} />

  return (
    <View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text>{dados}</Text>
      </Overlay>
    </View>
  );
}

export default CustomOverlay