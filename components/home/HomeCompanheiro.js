import React, { useState, useEffect } from 'react'
import { 
  Platform, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  TouchableOpacity, 
  ScrollView, 
  Item, 
  Text, 
  View,
  ImageBackground,
  Dimensions,
  Linking
} from 'react-native';
import { Rating, AirbnbRating, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import ImageCarousel from '../tools/ImageCarousel';
import { AppLoading } from 'expo';
import { coletarDadosCompanheiro } from '../../services/data-service'
import CurativosAvaliacao from '../tools/CurativosAvaliacao';

const { width } = Dimensions.get('window'); 
let nome_user = 'Alberto';

const TelaHomeCompanheiro = ({route, navigation}, props) => {

    //Recebe o id do usuário logado e utilizará para captura dos dados próprios
    const {idUsuarioRecebido} = route.params;

    //Interações com state
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [nome, setNome] = useState();
    const [nomeAbreviado, setNomeAbreviado] = useState();
    const [avaliacao, setAvaliacao] = useState();
    const [loading, setLoading] = useState(false);
    const [dadosOverlay, setDadosOverlay] = useState('teste');
    const [visibilidadeOverlay, setVisibilidadeOverlay] = useState(false);
    const [profissionalExibido, setProfissionalExibido] = useState(0);

    React.useEffect(() => {

      //Atualizando tela com loading
      setLoading(true);

      async function coletarDadosEntidade() {
        
          try{
          
              const response = await coletarDadosCompanheiro(idUsuarioRecebido)
  
              //Atualizando tela sem loading
              setLoading(false);
  
              //Se a resposta voltar com status 200 OK, 
              //prossegue, senão dá mensagem
              if(response.ok){
                  
                  response.json().then((json) => {
                  
                      const nome = json.nome;
                      const avaliacao = json.avaliacao;

                      setNome(nome);
                      setAvaliacao(avaliacao);

                      let nomeCompleto = nome.split(" ");
                      console.log('O nome abreviado nesse caso é: ', nomeCompleto[0])
                      setNomeAbreviado(nomeCompleto[0]);
                  
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

    //Realiza chamada telefônica para o 0800 do SENES
    const telefonarCentral = () => {
        Linking.openURL(`tel:11997671801`)
    }

    //Código para carregamento das fontes antes da renderização
    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return (
            <AppLoading
                startAsync={loadResourcesAsync}
                onError={handleLoadingError}
                onFinish={() => handleFinishLoading(setLoadingComplete)}
            />
        );
    }

    async function loadResourcesAsync() {
        await Promise.all([
            Font.loadAsync({
                'montserrat-regular-texto': require('../../assets/fonts/montserrat/Montserrat-Regular.ttf'),
                'montserrat-titulo': require('../../assets/fonts/montserrat/Montserrat-Light.ttf'),
                'montserrat-titulo-magro': require('../../assets/fonts/montserrat/Montserrat-Thin.ttf'),
                'montserrat-negrito': require('../../assets/fonts/montserrat/Montserrat-SemiBold.ttf')
            }),
        ]);
    }

    function handleLoadingError(error) {
    console.warn(error);
    }

    function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
    }

    const retornarMenu = () => {

      navigation.openDrawer();  
    }

    return (
        <ScrollView style={styles.container}>

          <LinearGradient
              colors={['transparent', '#005E80']}    
          >

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity
                    style={{paddingLeft: 20}}
                    onPress={retornarMenu}
                >
                    <Icon name='menu' type='entypo' size={40} color="#005E80" />
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.button_info}
                >
                    <Icon name='info' type='feather' size={40} color="#005E80" />
                </TouchableOpacity>
            </View>

            <Text style={styles.textWelcome}>Seja bem-vindo(a), {nomeAbreviado} ^^</Text>

            <View style={styles.container_info_pessoal}>

              <View style={styles.container_avaliacao}>
                <Text style={styles.tituloAvaliacao}>Nota Pessoal</Text>
                <CurativosAvaliacao avaliacao={avaliacao}/>
              </View>

              <TouchableWithoutFeedback onPress={() => {
                  alert('Atualizando status...');
              }}>
                <View style={styles.button_disponibilidade}>
                  <Text style={styles.texto_disponibilidade}>Disponível</Text>
                </View>
              </TouchableWithoutFeedback>

            </View>
            
            <View style={styles.carouselContainer2}>
                <ImageCarousel/>
            </View>

            <View style={styles.container_ajuda}>
                <Text style={styles.texto_ajuda}>Precisa de ajuda? Vem conversar com a gente ^^</Text>
                <TouchableOpacity
                    style={styles.button_telefonar}
                    onPress={telefonarCentral}
                    disabled={loading ? true : false}
                >
                    <Text style={styles.button_telefonar_texto}>TELEFONAR</Text>
                </TouchableOpacity>
            </View>
          
          </LinearGradient>

        </ScrollView>  
      )
}

const styles = StyleSheet.create({
      container: {
        flex: 1,
        flexDirection: "column"
      },
      textWelcome: {
        color: "#005E80",
        fontFamily: "montserrat-regular-texto",
        fontSize: 25,
        textAlign: 'center',
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 30,
        marginTop: 10
      },
      button_disponibilidade:{
        alignSelf: 'flex-end',
        backgroundColor: 'green',
        borderRadius: 20,
        padding: 5,
        marginRight: 15,
        marginBottom: 10
      },
      texto_disponibilidade: {
        color: 'white',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 3,
        paddingBottom: 3

      },
    button_info: {
      alignSelf: 'flex-start',
      borderRadius: 20,
      padding: 5,
      marginRight: 5,
      marginBottom: 10
    },
    carouselContainer2:{ 
      width: width,
      height:width*0.99,
      marginBottom:30,
    }, 
    containRating:{
      width: 250,
      alignItems:'center',
    },
    rating:{
      height: 25,
      width: 100
    },
    textLegenda:{
      width: 100,
      alignSelf: 'center',
      textAlign: 'center'
    },
    gradient:{
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      height: 490,
    },
    disponibilidade: {
      alignSelf: 'flex-start',
      backgroundColor: 'green',
      borderRadius: 20,
      padding: 5,
      marginRight: 5,
      marginBottom: 10
    },
    container_info_pessoal: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 20
    },
    container_ajuda: {
      flexDirection: "row",
      justifyContent: "space-around",
      backgroundColor: '#969FAA',
    },
    texto_ajuda: {
      color: "#47525E",
      fontFamily: "montserrat-regular-texto",
      fontSize: 15,
      width: 150,
      textAlign: 'justify',
      marginLeft: 30,
      alignSelf: 'center'
    },
    button_telefonar: {
      height: 50,
      margin: 40,
      borderColor: "#47525E",
      borderWidth: 2,
      borderRadius: 5,
      justifyContent: 'center',
      padding: 10,
      backgroundColor: '#47525E'
    },
    button_telefonar_texto:{
      fontFamily: "montserrat-regular-texto",
      color: "#FFFFFF",
      textAlign: "center",
      fontSize: 18
    },
    tituloAvaliacao:{
      fontFamily: "montserrat-regular-texto",
      color: "#005E80",
      textAlign: "center",
      fontSize: 18
    }
  });
  

export default TelaHomeCompanheiro