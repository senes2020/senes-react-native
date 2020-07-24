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



export default class ImageCarousel extends Component {
  state = { agendamentos: [] };

  renderItem = ({ item, index }) => {
    const { horario_inicio, horario_fim, data, rua, cep, bairro, cidade, pagamento, complemento, beneficiario  } = item;
    let dataFormatada = data.split('-');
    dataFormatada = dataFormatada[2] + '/' + dataFormatada[1] + '/' + dataFormatada[0]
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
          <Text style={styles.titleText}>{dataFormatada}</Text>

          <View style={styles.container_dado_agendamento}>
            <Icon name='alarm' type='material' size={25} color="#005E80" />
            <Text style={styles.contentText}>{horario_inicio} até {horario_fim}</Text>
          </View>

          <View style={styles.container_dado_agendamento_local}>
            <Icon name='location-on' type='material' size={25} color="#005E80" />
            <View>
              <Text style={styles.contentText}>{rua}</Text>
              <Text style={styles.contentText}>{bairro}</Text>
              {cep ? 
              <Text style={styles.contentText}>{cidade} - CEP: {cep}</Text>
              :
                <Text style={styles.contentText}>{cidade}</Text>
              }
              <Text style={styles.contentText}>{complemento}</Text>
            </View>
          </View>
          
          <View style={styles.container_dado_agendamento}>
            <Icon name='account-circle' type='material' size={25} color="#005E80" />
            <Text style={styles.contentText}>{beneficiario.nome}</Text>
          </View>

          <View style={styles.container_dado_agendamento}>
            <Icon name='attach-money' type='material' size={25} color="#005E80" />
            <Text style={styles.contentText}>{pagamento.valor}</Text>
          </View>
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
        data={this.props.lista}
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
  },
  item: {
    borderWidth: 2,
    backgroundColor: '#ffffffff',
    flex: 1,
    borderRadius: 10,
    elevation: 3,
    marginStart: 10,
  },
  container_dado_agendamento: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10
  },
  container_dado_agendamento_local: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10
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
    marginLeft: 10,
    paddingTop: 20
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5
  },
  contentText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginLeft: 10
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
    marginTop: 10,
    marginBottom: 20
  }
});
