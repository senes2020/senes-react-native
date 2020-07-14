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
import { Icon } from 'react-native-elements';

const { width } = Dimensions.get('window');

const negativoImagem = 'https://www.pagina1pb.com.br/wp-content/uploads/2018/11/X-png-23.png'
const aceitarImagem = 'https://icons.iconarchive.com/icons/custom-icon-design/flatastic-9/512/Accept-icon.png'

const data = [
  {
    title: 'Me ajude com às compras',
    horario: 'Horário: 10:20am até 11:20am',
    dia:'Data: 11 de fevereiro, 2019',
    local:'Local: Rua Santa Barbara, SP',
    pagamento: '80,00'
  },
  {
    title: 'Me ajude com às compras',
    horario: 'Horário: 10:20am até 11:20am',
    dia:'Data: 11 de fevereiro, 2019',
    local:'Local: Rua Santa Barbara, SP',
    pagamento: '80,00'
  },
  {
    title: 'Me ajude com às compras',
    horario: 'Horário: 10:20am até 11:20am',
    dia:'Data: 11 de fevereiro, 2019',
    local:'Local: Rua Santa Barbara, SP',
    pagamento: '80,00'
  },
  {
    title: 'Me ajude com às compras',
    horario: 'Horário: 10:20am até 11:20am',
    dia:'Data: 11 de fevereiro, 2019',
    local:'Local: Rua Santa Barbara, SP',
    pagamento: '80,00'
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
          <Icon name='event-note' type='material' size={70} color="#005E80" />
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.contentText}>{horario}</Text>
          <Text style={styles.contentText}>{dia}</Text>
          <Text style={styles.contentText}>{local}</Text>
        </View>
        <View style={styles.container_acao}>
          <TouchableOpacity>
            <Icon name='closecircle' type='antdesign' size={50} color="#800f00" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name='checkcircle' type='antdesign' size={50} color="#008013" />
          </TouchableOpacity>
        </View>
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
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  contentText: {
    marginTop: 10,
    fontSize: 15,
    alignSelf: 'flex-start'
  },
  valueText:{
    marginTop: 10,
    marginStart: 60,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ff00',
  },
  container_acao:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 30
  }
});
