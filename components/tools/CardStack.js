import * as React from 'react';
import {
  Text, 
  View,
  SafeAreaView, 
  StyleSheet,
  Image} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CurativosAvaliacao from './CurativosAvaliacao';
import CustomOverlay from './CustomOverlay';
import { Overlay } from 'react-native-elements';

export default class CardStack extends React.Component {


    constructor(props){
        super(props);
        this.state = {
          activeIndex:0,
          carouselItems: [
          {
              sexo:"F",
              nome: "Adelaide Pereira Mello",
              avaliacao: 4.5,
              cnh: true,
              especializacoes: ['Gerontologia', 'Técnico', 'Auxiliar', 'Home Care'],
              valor: 52.20,
              dados: 'Olá, tudo bem? Meu nome é Adelaide.'
          },
          {
              sexo:"M",
              nome: "Marcos Pereira Silva",
              avaliacao: 3,
              cnh: true,
              especializacoes: ['Gerontologia', 'Enfermeiro'],
              valor: 50.45,
              dados: 'Olá, tudo bem? Meu nome é Marcos.'
          },
          {
              sexo:"F",
              nome: "Rosana Pereira Mello",
              avaliacao: 0,
              cnh: false,
              especializacoes: ['Gerontologia', 'Técnico'],
              valor: 52.20,
              dados: 'Olá, tudo bem? Meu nome é Rosana.'
          },
          {
              sexo:"F",
              nome: "Loretta Gonçalves Pedrosa",
              avaliacao: 2,
              cnh: true,
              especializacoes: ['Home Care'],
              valor: 20.50,
              dados: 'Olá, tudo bem? Meu nome é Loretta.'
          },
          {
              sexo:"M",
              nome: "Ronaldo Fernandes Fonseca",
              avaliacao: 1.5,
              cnh: false,
              especializacoes: ['Home Care'],
              valor: 52.20,
              dados: 'Olá, tudo bem? Meu nome é Ronaldo.'
          },
        ],
        dados: 'Teste de dados',
        visibilidadeBio: false
      }
    }

    //Função que atualiza dados do Overlay na tela principal
    //Enviando os dados necessários e a visibilidade
    //A função overlay é recebida pelo componente
    toggleOverlay = (objeto, index) => {

      let dados = this.state.carouselItems[index].dados;
      let visibilidadeBio = true;

      this.props.overlay(visibilidadeBio, dados);
    };

    //Função que atualiza o state com a posição do profissional exibido
    //e envia a mesma para o componente pai
    //obtem a função profissional pelo props
    atualizaIndex = (index) => {
      this.setState({activeIndex:index})
      this.props.profissional(index)
    }

    _renderItem = ({item,index}) => {

        return (
          <View style={styles.container_principal}>

            <View style={styles.container_bio}>

              <View style={styles.container_companheiro}>
                <Image
                  style={styles.image_companheiro}
                  source={item.sexo == 'M' ? require('../../assets/icons/icone-homem.png') 
                                           : require('../../assets/icons/icone-mulher.png')}
                />
              </View>

              <TouchableOpacity
                onPress={this.toggleOverlay.bind(this, item, index)}
                style={styles.button_info}
              >
                <Image
                    style={styles.image_info}
                    source={require('../../assets/icons/informacoes.png')}
                />
              </TouchableOpacity>

            </View>

            <View style={styles.container_nome}>
              <Text style={styles.nome_companheiro}>{item.nome}</Text>
            </View>

            <View style={styles.container_avaliacao}>
              <CurativosAvaliacao avaliacao={item.avaliacao}/>
            </View>

            <View style={styles.container_cnh}>
              {item.cnh == true ?
              <View style={styles.cnh_resposta}>
                <Image
                  style={styles.image_avaliacao}
                  source={require('../../assets/icons/volante.png')}
                /> 
                <Text style={styles.texto_cnh}>POSSUI CNH</Text>
              </View>
              :
              <View style={styles.cnh_resposta}>
                <Image
                  style={styles.image_avaliacao}
                  source={require('../../assets/icons/volante_desbotado.png')}
                />
                <Text style={styles.texto_cnh}>NÃO POSSUI CNH</Text>
              </View>
              }
            </View>           

            <View style={styles.container_especializacao}>
                {item.especializacoes.map(function(name, index){
                  if(name == 'Técnico' || name == 'Auxiliar' || name == 'Enfermeiro'){
                    return  <View key={ index } style={styles.item_especializacao_formacao}>
                              <Text style={styles.texto_especializacao}>{name}</Text>
                            </View>  
                  }else{
                    return  <View key={ index } style={styles.item_especializacao_complemento}>
                              <Text style={styles.texto_especializacao}>{name}</Text>
                            </View>
                  } 
                  
                })}
            </View>

            <View style={styles.container_valor}>
              <Text style={styles.valor}>R$ {item.valor} /hora</Text>
            </View>

          </View>

        )
    }

    render() {
        return (
          <SafeAreaView style={{flex: 1  }} teste={this.funcaoTeste}>
            <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
                <Carousel
                  layout={"stack"}
                  layoutCardOffset={`18`}
                  ref={ref => this.carousel = ref}
                  data={this.state.carouselItems}
                  sliderWidth={300}
                  itemWidth={320}
                  renderItem={this._renderItem}
                  onSnapToItem = { index => this.atualizaIndex(index) }
                  />
            </View>
          </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
  container_principal: {
    backgroundColor: 'white',
    borderColor: '#005E80',
    borderWidth: 2,
    borderRadius: 5,
    height: 400,
    padding: 20,
    marginLeft: 25,
    marginRight: 25,
    justifyContent: 'space-between'
  },
  container_bio: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container_companheiro: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container_avaliacao: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  container_cnh: {
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  container_especializacao: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  cnh_resposta:{
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  item_especializacao_formacao: {
    alignSelf: 'flex-start',
    backgroundColor: 'green',
    borderRadius: 20,
    padding: 5,
    marginRight: 5,
    marginBottom: 10
  },
  item_especializacao_complemento: {
    alignSelf: 'flex-start',
    backgroundColor: 'orange',
    borderRadius: 20,
    padding: 5,
    marginRight: 5,
    marginBottom: 10
  },
  valor:{
    color: "#008a12",
    fontFamily: "montserrat-regular-texto",
    fontSize: 20,
    textAlign: 'center'
  },
  nome_companheiro: {
    color: "#005E80",
    fontFamily: "montserrat-regular-texto",
    fontSize: 15,
    textAlign: 'center'
  },
  texto_especializacao: {
    color: "white",
    fontFamily: "montserrat-regular-texto",
    fontSize: 12
  },
  texto_cnh:{
    color: "black",
    fontFamily: "montserrat-regular-texto",
    fontSize: 15,
    marginLeft: 10
  },
  button_info: {
      alignSelf: "flex-end",
      height: 60,
      width: 50,
      marginRight: 10,
      borderColor: "transparent",
      borderWidth: 2,
      borderRadius: 60,
      justifyContent: "center"
  },
  image_info: {
      width: 40,
      resizeMode: "contain",
      alignSelf: "flex-end"
  },
  image_avaliacao: {
    height: 30,
    width: 30,
  },
  image_companheiro: {
      width: 130,
      height: 130,
      alignSelf: "center",
      marginRight: -10
  }
})

