//Recursos do React/React Native
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Linking, Alert, ActivityIndicator} from 'react-native'

//Importando componente de fontes
import * as Font from 'expo-font'

//Importando AppLoading para load de recursos
//e LinearGradient para background
import { AppLoading } from 'expo'
import { coletarDadosBeneficiario } from '../../services/data-service'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import CardStack from '../tools/CardStack'
import CustomOverlay from '../tools/CustomOverlay'
import { LinearGradient } from 'expo-linear-gradient';

//Importantando classes para o drawer
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import TelaHomeCompanheiro from './HomeCompanheiro'
import { NavigationContainer} from '@react-navigation/native'
import { NavigationActions, StackActions } from 'react-navigation'
import { Icon } from 'react-native-elements'
import NavigatorAutenticado from '../NavigatorAutenticado'

const HomeBeneficiario = ({route, navigation}, props) => {

    //Recebe o id do usuário logado e utilizará para captura dos dados próprios 
    const {idUsuarioRecebido} =  route.params;

    //Interações com state
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [nome, setNome] = useState();
    const [nomeAbreviado, setNomeAbreviado] = useState();
    const [loading, setLoading] = useState(false);
    const [dadosOverlay, setDadosOverlay] = useState('teste');
    const [visibilidadeOverlay, setVisibilidadeOverlay] = useState(false);
    const [profissionalExibido, setProfissionalExibido] = useState(0);

    React.useEffect(() => {

        //Atualizando tela com loading
        setLoading(true);

        async function coletarDadosEntidade() {
          
            try{
            
                const response = await coletarDadosBeneficiario(idUsuarioRecebido)
    
                //Atualizando tela sem loading
                setLoading(false);
    
                //Se a resposta voltar com status 200 OK, 
                //prossegue, senão dá mensagem
                if(response.ok){
                    
                    response.json().then((json) => {
                    
                        const nome = json.nome;
                        setNome(nome);

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

    //Função chamada para agendamentos
    const exibirProfissional = () => {
        Alert.alert('O profissional escolhido tem o número: ' + profissionalExibido)
        navigation.navigate('Agendamento')
    }

    //Função que atualiza dados do profissional exibido
    const atualizarProfissionalAtual = (codigo) => {
        setProfissionalExibido(codigo)
    }

    //Função de atualização de dados e visibilidade do Overlay
    const atualizarOverlay = (visibilidade, dados) => {
        setDadosOverlay(dados)
        setVisibilidadeOverlay(visibilidade)
    }

    //Atualização do Overlay para que seja fechado
    const atualizarVisibilidade = () => {
        setVisibilidadeOverlay(!visibilidadeOverlay)
    }

    const retornarMenu = () => {

        navigation.openDrawer();
        
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

    return (
        <ScrollView style={styles.container}>

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

            <LinearGradient
                colors={['transparent', '#005E80']}
                
            >

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity
                        style={{paddingLeft: 20, marginTop: 50}}
                        onPress={retornarMenu}
                    >
                        <Icon name='menu' type='entypo' size={40} color="#005E80" />
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={styles.button_info}
                    >
                        <Icon name='info' iconStyle={{marginTop: 15}} type='feather' size={40} color="#005E80" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.texto}>Seja bem-vindo(a), {nomeAbreviado} ^^</Text>

                <View style={styles.container_card}>
                    <CardStack 
                        profissional={(codigo) => atualizarProfissionalAtual(codigo)}
                        overlay={(visibilidade, dados) => atualizarOverlay(visibilidade, dados)}
                    />
                </View>

                <TouchableOpacity
                    style={styles.button}
                    disabled={loading ? true : false}
                    onPress={exibirProfissional}
                >
                    <Text style={styles.button_texto}>AGENDAR</Text>
                </TouchableOpacity>

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
                
                
                    {visibilidadeOverlay ?
                        
                    <CustomOverlay visibilidade={atualizarVisibilidade} dados={dadosOverlay}/>
                        
                    :   
                        <Text></Text>
                    }
            </LinearGradient>

        </ScrollView>   
      )
}

const TelaHomeBeneficiario = ({route, navigation}) => {

    //Recebe o ID do usuário logado
    //e envia como parâmetro para as telas
    const {idUsuarioRecebido, flgDoisPerfis} =  route.params;

    const Drawer = createDrawerNavigator();

    //Função para ressetar essa nevagação 
    //e voltar para o Stack
    const retornarMenu = () => {

        navigation.navigate('Index')

        // navigation.navigate(
        //     'Index', 
        //     {}, 
        //     NavigationActions.navigate({ 
        //         routeName: 'Index' 
        //     })
        // )
        
    }

    return (
      <NavigationContainer independent={true}>
        <Drawer.Navigator initialRouteName="Dados de Beneficiário" drawerContent={props => {
        return (
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem label="Voltar para o menu" onPress={retornarMenu}
                icon={({ focused, color, size }) => <Icon name='exit-to-app' type='material' size={30} color="#005E80" />} 
                />
            </DrawerContentScrollView>
            )
        }}>
          <Drawer.Screen 
            name="Meus Dados"  
            initialParams={{ idUsuarioRecebido: idUsuarioRecebido }}
            component={TelaHomeCompanheiro} 
            options={{
                drawerIcon: config => <Icon
                    size={30}
                    name='user-edit'
                    type='font-awesome-5'
                    color="#005E80"></Icon>
            }}
          />
          <Drawer.Screen 
            name="Dados de Beneficiário" 
            component={HomeBeneficiario}  
            initialParams={{ idUsuarioRecebido: idUsuarioRecebido, flgDoisPerfis: flgDoisPerfis }}
            options={{
                drawerIcon: config => <Icon
                    size={30}
                    name='human-greeting'
                    type='material-community'
                    color="#005E80"></Icon>
            }}
          />
          <Drawer.Screen 
            name="teste"
            component={NavigatorAutenticado}  
            initialParams={{ idUsuarioRecebido: idUsuarioRecebido, flgDoisPerfis: flgDoisPerfis }}
          />
          {flgDoisPerfis ?
          <Drawer.Screen 
            name="Dados de Companheiro" 
            component={TelaHomeCompanheiro}  
            initialParams={{ idUsuarioRecebido: idUsuarioRecebido, flgDoisPerfis: flgDoisPerfis }}
            options={{
                drawerIcon: config => <Icon
                    size={30}
                    name='work'
                    type='material'
                    color="#005E80"></Icon>
            }}
          /> : null}
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }

const styles = StyleSheet.create({
    containerLoading: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        flexDirection: "column"
    },
    container_card: {
        height: 420,
        alignSelf: 'center',
        marginRight: 20,
        marginLeft: 20
    },
    container_ajuda: {
        flexDirection: "row",
        justifyContent: "space-around",
        backgroundColor: '#969FAA'
    },
    texto: {
        color: "#005E80",
        fontFamily: "montserrat-regular-texto",
        fontSize: 25,
        textAlign: 'center',
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 30,
        marginTop: 10
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
    image: {
        width: 250,
        height: 250,
        alignSelf: 'center'
    },
    button: {
        height: 50,
        margin: 40,
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 20
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
    button_info: {
        alignSelf: "flex-end",
        height: 60,
        width: 50,
        marginTop: 30,
        marginRight: 30,
        borderColor: "transparent",
        borderWidth: 2,
        borderRadius: 60,
        justifyContent: "center"
    },
    button_texto:{
        fontFamily: "montserrat-regular-texto",
        color: "white",
        textAlign: "center",
        fontSize: 20,
        marginTop: 10
    },
    button_telefonar_texto:{
        fontFamily: "montserrat-regular-texto",
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 18
    },
    image_info: {
        width: 50,
        resizeMode: "contain",
        alignSelf: "center"
    }
})

export default TelaHomeBeneficiario