import * as React from 'react';
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
  Dimensions
} from 'react-native';
import { Rating, AirbnbRating, Icon } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import ImageCarousel from '../tools/ImageCarousel';
import { AppLoading } from 'expo';
import TelaHomeBeneficiario from './HomeBeneficiario';

//Importantando classes para o drawer
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer} from '@react-navigation/native'

const { width } = Dimensions.get('window'); 
let nome_user = 'Alberto';

const HomeCompanheiro = ({route, navigation}, props) => {

    //Interações com state
    const [isLoadingComplete, setLoadingComplete] = React.useState(false);

    //Código para carregamento das fontes antes da renderização
    // if (!isLoadingComplete && !props.skipLoadingScreen) {
    //     return (
    //         <AppLoading
    //             //startAsync={loadResourcesAsync}
    //             onError={handleLoadingError}
    //             onFinish={() => handleFinishLoading(setLoadingComplete)}
    //         />
    //     );
    // }

    // async function loadResourcesAsync() {
    //     await Promise.all([
    //         Font.loadAsync({
    //             'montserrat-regular-texto': require('../../assets/fonts/montserrat/Montserrat-Regular.ttf'),
    //             'montserrat-titulo': require('../../assets/fonts/montserrat/Montserrat-Light.ttf'),
    //             'montserrat-titulo-magro': require('../../assets/fonts/montserrat/Montserrat-Thin.ttf'),
    //             'montserrat-negrito': require('../../assets/fonts/montserrat/Montserrat-SemiBold.ttf')
    //         }),
    //     ]);
    // }

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
        <View style={styles.container}>

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

            <Text style={styles.textWelcome}>Olá {nome_user}</Text>

            <TouchableWithoutFeedback onPress={() => {
                alert('Atualizando status...');
            }}>

                <View style={styles.button_disponibilidade}>

                <Text>Disponível</Text>

                </View>

            </TouchableWithoutFeedback>  

            <View style={styles.carouselContainer2}>
                <ImageCarousel/>
            </View>

            <View style={styles.containRating}>
                <Rating
                imageSize={25}
                readonly 
                style={styles.rating} />
                <Text style={styles.textLegenda}>Nota Pessoal</Text>
            </View>
          
          </LinearGradient>

        </View>   
      )
}

const TelaHomeCompanheiro = ({route, navigation}) => {

  //Recebe o ID do usuário logado
  //e envia como parâmetro para as telas
  const {idUsuarioRecebido, flgDoisPerfis} =  route.params;

  const Drawer = createDrawerNavigator();

  //Função para ressetar essa nevagação 
  //e voltar para o Stack
  const retornarMenu = () => {

      //console.log(navigation)

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
      <Drawer.Navigator initialRouteName="Dados de Companheiro" drawerContent={props => {
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
          name="Dados de Companheiro" 
          component={HomeCompanheiro}  
          initialParams={{ idUsuarioRecebido: idUsuarioRecebido, flgDoisPerfis: flgDoisPerfis }}
          options={{
              drawerIcon: config => <Icon
                  size={30}
                  name='work'
                  type='material'
                  color="#005E80"></Icon>
          }}
        />
        {flgDoisPerfis ?
        <Drawer.Screen 
        name="Dados de Beneficiario" 
        component={TelaHomeBeneficiario}  
        initialParams={{ idUsuarioRecebido: idUsuarioRecebido, flgDoisPerfis: flgDoisPerfis }}
        options={{
            drawerIcon: config => <Icon
                size={30}
                name='human-greeting'
                type='material-community'
                color="#005E80"></Icon>
        }}
       /> : null}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#ffffff',
    },
    textWelcome: {
      color: '#ffffffcc',
      marginBottom: 5,
      alignSelf:'flex-start',
      marginStart: 8,
      opacity: 0.5,
      fontSize: 20
    },
    button_disponibilidade:{
      width: 100,
      height: 25,
      backgroundColor:'#ffffff',
      alignItems: 'center',
      borderRadius: 8,
      borderWidth: 2,
      borderColor: '#5555ff',
      marginBottom: 50,
      marginEnd: 8,
      marginVertical: -40,
      alignSelf:'flex-end'
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
  }
  });
  

export default TelaHomeCompanheiro