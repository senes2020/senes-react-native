import React, { useState, useEffect } from 'react'
import {
  Text, 
  View,
  SafeAreaView, 
  StyleSheet,
  Image,
  ActivityIndicator} from 'react-native';

import Carousel from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CurativosAvaliacao from './CurativosAvaliacao';
import { coletarProfissionais } from '../../services/data-service'

const CardStack = (props) => {

    //Interações com state
    const [activeIndex, setActiveIndex] = useState(0);
    const [carouselItems, setCarouselItems] = useState(
                        [{
                          codigo: '',
                          nome: '',
                          sexo: '',
                          avaliacao: 0,
                          cnh: false,
                          especializacoes: [],
                          valor: 0,
                          dados: ''
                        }]
    );
    const [loading, setLoading] = useState(false);

    //Obtendo profissionais registrados
    React.useEffect(() => {

      //Atualizando tela com loading
      setLoading(true);

      async function coletarDadosEntidade() {
        
          try{
          
              const response = await coletarProfissionais()
  
              //Atualizando tela sem loading
              setLoading(false);

              let arrayProfissionais = []
  
              //Se a resposta voltar com status 200 OK, 
              //prossegue, senão dá mensagem
              if(response.ok){
                  
                  response.json().then((json) => {

                      json.map((profissional) => {
                        
                        //Aqui consegue pegar dados de cada profissional
                        //falta montar os objetos, enviar pros itens do carrossel
                        //e por fim demonstra-los em tela
                        let especializacoes = []
                        
                        profissional.especializacoes.map((especializacao) => {
                          especializacoes.push(especializacao.nome_especializacao)  
                        })

                        let companheiro = {
                          codigo: profissional.id,
                          nome: profissional.nome,
                          sexo: profissional.sexo,
                          avaliacao: profissional.avaliacao,
                          cnh: profissional.carteira_motorista == 'S' ? true : false,
                          especializacoes: especializacoes,
                          valor: profissional.valor_hora,
                          dados: profissional.dados_bio
                        }
                        
                        //Reunindo profissionais retornados em array
                        arrayProfissionais.push(companheiro)

                      })

                      //Atualizando state com array de profissionais retornado
                      setCarouselItems(arrayProfissionais)
                  
                  })
                 
              }else if(response.status == 404){
                  
                  Alert.alert(
                  "Erro de Obtenção de dados :(",
                  "Ooops, sorry, erro nosso! Consulte os desenvolvedores sobre a passagem de ID de usuário para a tela Home.",
                  [
                      
                      { text: "OK"}
                  ],
                  { cancelable: false }
                  );
              }
  
          }catch(erro){
              console.log('entrei no catch')
              console.log(erro)
          }

      }
  
      coletarDadosEntidade();
    }, []);

    //Função que atualiza dados do Overlay na tela principal
    //Enviando os dados necessários e a visibilidade
    //A função overlay é recebida pelo componente
    const toggleOverlay = (objeto, index) => {

      let dados = objeto.dados;
      let visibilidadeBio = true;

      props.overlay(visibilidadeBio, dados);
      
    };

    //Função que atualiza o state com a posição do profissional exibido
    //e envia a mesma para o componente pai
    //obtem a função profissional pelo props
    const atualizaIndex = (index) => {

      //Atualização do index
      setActiveIndex(index);

      //Código do profissional
      const codigoProfissional = carouselItems[index].codigo

      //Fazendo o envio do código
      props.profissional(codigoProfissional);
    }

    const _renderItem = ({item,index}) => {

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
                onPress={toggleOverlay.bind(this, item, index)}
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
                {item.especializacoes.map((name, index) => {
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

    return (
      <SafeAreaView style={{flex: 1  }}>
        <View
              style={[
              styles.containerLoading,
              {
                  backgroundColor: loading
                  ? "#CCCCCC55"
                  : "#FFFFFF00",
              },
              ]}
          >
              <ActivityIndicator
              size="large"
              animating={loading}
              color="#005E80"
              />
        </View>
        <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
            <Carousel
              layout={"stack"}
              layoutCardOffset={`18`}
              //ref={ref => carouselItems = ref}
              data={carouselItems}
              sliderWidth={300}
              itemWidth={320}
              renderItem={(item, index) => _renderItem(item, index)}
              onSnapToItem = { index => atualizaIndex(index) }
              />
        </View>
      </SafeAreaView>
    );
    
}

const styles = StyleSheet.create({
  containerLoading: {
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  container_principal: {
    backgroundColor: 'white',
    borderColor: '#005E80',
    borderWidth: 2,
    borderRadius: 5,
    minHeight: 400,
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
    justifyContent: 'flex-end',
    marginTop: 10
  },
  container_cnh: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 10
  },
  container_especializacao: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 10
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

export default CardStack

