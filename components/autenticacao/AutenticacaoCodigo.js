//Recursos do React/React Native
import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native'

//Importando componente de fontes
import * as Font from 'expo-font'

//Importando AppLoading para load de recursos
import { AppLoading } from 'expo';

//Importando input com label flutuante
import FloatingLabelInput from '../tools/FloatingLabelInputWhite'

//Importando serviços
import { autenticarCodigo } from '../../services/auth-service'

//Fonte: https://www.npmjs.com/package/react-native-simple-toast
//Importando toast simples para avisos de validação

const TelaAutenticacaoCodigo = ({route, navigation}, props) =>{

    //Recebe o email do cliente 
    //fragmenta para exibir somente a inicial e o final, por segurança.
    const {emailRecebido} =  route.params;
    const inicialEmail = emailRecebido.substr(0, 1)
    const finalEmail = emailRecebido.split('@')
    const emailFinal = inicialEmail + '*****@' + finalEmail[1]

    //Interações com state
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [codigo, setCodigo] = useState('')

    const autenticarCodigoFunc = async(e) => {

        //O retorno vazio encerra a thread do código
        if(!validar()) return

        try{
            
            //Verifica se o código digitado corresponde
            //ao código salvo no perfil que está tentando logar
            const response = await autenticarCodigo(codigo)

            //Se a resposta retornar 200 OK, encaminha para a próxima página
            if(response.ok){
                navigation.navigate('AutenticacaoPerfil')
            }else{
                console.log('não vai rolar, kirido')
            }

        }catch(erro){
            console.log('entrei no catch')
            console.log(erro)
        }
        
    }

    validar = () =>{
        if(!codigo){
            Alert.alert('Por gentileza, digite um código válido')
            return false
        }else{
            return true
        }
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

    /*
    const escolherPerfilAutenticacao = (e) =>{
        codigo ? navigation.navigate('AutenticacaoPerfil') : console.log('Digite o sms')
    }
    */

    return (
        <View style={styles.container}>
           <Image
          style={styles.image_logo}
          source={require('../../assets/logo/logo_png_light.png')}
        />
         <Text style={styles.texto}>
            Enviamos um código para o seu email com final {emailFinal} cadastrado.
            Confirme que você é o dono dele ^^
         </Text>
         
         <FloatingLabelInput
            label="Digite seu código ^^"
            value={codigo ? codigo : ''}
            onChangeText={(texto) => setCodigo(texto)}
            maxLength={5}
            keyboardType={'numeric'}
        />

        <TouchableOpacity
         style={styles.button}
         onPress={autenticarCodigoFunc}
        >
         <Text style={styles.button_texto}> CONFIRMAR</Text>
       </TouchableOpacity>

       <TouchableOpacity
         style={styles.button_info}
        >
         <Text style={styles.button_texto}>i</Text>
       </TouchableOpacity>

        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#005E80",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    texto:{
        fontFamily: "montserrat-regular-texto",
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 17,
        marginTop: 0,
        marginBottom: 40,
        marginLeft: 20,
        marginRight: 20
    },
    image_logo: {
        width: 200,
        height: 200,
        alignSelf: "center"
    },
    input: {
        height: 50,
        margin: 30,
        fontFamily: "montserrat-regular-texto",
        color: "#FFFFFF",
        fontSize: 20,
        textAlign: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#FFFFFF'
    },
    button: {
        height: 50,
        margin: 40,
        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 20
    },
    button_info: {
        height: 50,
        width: 50,
        margin: 30,
        borderColor: "#FFFFFF",
        borderWidth: 2,
        borderRadius: 60
    },
    button_texto:{
        fontFamily: "montserrat-regular-texto",
        color: "#FFFFFF",
        textAlign: "center",
        fontSize: 20,
        marginTop: 10
    }
})

export default TelaAutenticacaoCodigo