import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  ImageBackground,
  Button,
  Image
} from 'react-native';
import Carousel from 'react-native-anchor-carousel';

const { width } = Dimensions.get('window');

const negativoImagem = 'https://www.pagina1pb.com.br/wp-content/uploads/2018/11/X-png-23.png'
const aceitarImagem = 'https://icons.iconarchive.com/icons/custom-icon-design/flatastic-9/512/Accept-icon.png'

const data = [
  {
    title: 'Me ajude com às compras',
    horario: 'Horário: 10:20am até 11:20am',
    dia:'Data: 11 de fevereiro, 2019',
    local:'Local: Rua Santa Barbara, SP',
    pagamento: 'Valor Hora: R$ 80,00'
  },
  {
    title: 'Me ajude com às compras',
    horario: 'Horário: 10:20am até 11:20am',
    dia:'Data: 11 de fevereiro, 2019',
    local:'Local: Rua Santa Barbara, SP',
    pagamento: 'Valor Hora: R$ 80,00'
  },
  {
    title: 'Me ajude com às compras',
    horario: 'Horário: 10:20am até 11:20am',
    dia:'Data: 11 de fevereiro, 2019',
    local:'Local: Rua Santa Barbara, SP',
    pagamento: 'Valor Hora: R$ 80,00'
  },
  {
    title: 'Me ajude com às compras',
    horario: 'Horário: 10:20am até 11:20am',
    dia:'Data: 11 de fevereiro, 2019',
    local:'Local: Rua Santa Barbara, SP',
    pagamento: 'Valor Hora: R$ 80,00'
  },
]; 

export default class ImageCarousel extends Component {
  renderItem = ({ item, index }) => {
    const { title, horario, dia, local, pagamento } = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.item}
        onPress={() => {
          this.numberCarousel.scrollToIndex(index);
        }}
      >
        <View style={styles.lowerContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.titleText}>(^.^)</Text>
          <Text style={styles.contentText}>{horario}</Text>
          <Text style={styles.contentText}>{dia}</Text>
          <Text style={styles.contentText}>{local}</Text>
        </View>
        <Text style={styles.valueText}>{pagamento}</Text>
        <Image
            source={{ uri: negativoImagem }}
            style={styles.negativoBotao} >

        </Image>
        <Image
            source={{ uri: aceitarImagem }}
            style={styles.aceitarBotao}
        >
        </Image>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <Carousel
        style={styles.carousel}
        data={data}
        renderItem={this.renderItem}
        itemWidth={0.75 * width}
        inActiveOpacity={0.4}
        containerWidth={width - 10}
        ref={(c) => {
          this.numberCarousel = c;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  carousel: {
    flex: 1
  },
  item: {
    borderWidth: 2,
    backgroundColor: '#ffffffff',
    flex: 1,
    borderRadius: 10,
    borderColor: '#5555ff',
    elevation: 3,
    marginStart: 10,
    },
  imageBackground: {
    flex: 2,
    backgroundColor: '#EBEBEB',
    borderWidth: 5,
    borderColor: 'white'
  },
  rightTextContainer: {
    marginLeft: 'auto',
    marginRight: -2,
    backgroundColor: 'rgba(49, 49, 51,0.5)',
    padding: 3,
    marginTop: 3,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  rightText: { color: 'white' },
  lowerContainer: {
    flex: 1,
    margin: 10,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center'
  },
  contentText: {
    marginTop: 25,
    fontSize: 15,
    alignSelf: 'center'
  },
  valueText:{
    marginTop: 10,
    marginStart: 60,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ff00',
  },
  negativoBotao:{
    height: 40,
    width: 40,
    alignContent: 'center',
    marginTop: 280,
    marginStart: 10,
    position: 'absolute'
  },
  aceitarBotao:{
    marginTop: 280,
    marginStart: 205,
    height: 40,
    width: 40,
    alignContent: 'center',
    position: 'absolute'
  }
});
