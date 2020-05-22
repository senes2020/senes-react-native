//Recursos do React/React Native
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'

//Importando componente de fontes
import * as Font from 'expo-font'

//Importando AppLoading para load de recursos
import { AppLoading } from 'expo';

//Importando input com label flutuante
import FloatingLabelInput from '../tools/FloatingLabelInputWhite'

//Importando serviços
import { isSignedIn, autenticarCpf } from '../../services/auth-service'
import { Colors } from 'react-native/Libraries/NewAppScreen';

//Fonte: https://www.npmjs.com/package/react-native-simple-toast
//Importando toast simples para avisos de validação

const TelaAutenticacao = ({navigation}, props) =>{

    useEffect(() => {
        const session = isSignedIn()
        if(session.length){
            //Atualmente mandando para a Index, mas é só pra exemplo
            //Futuramente deve enviar para a Home
            navigation.navigate('AutenticacaoPerfil')
        }
    });

    //Interações com state
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false);

    const autenticarCpfFunc = async(e) => {

         //Atualizando tela com loading
         setLoading(true);

        //O retorno vazio encerra a thread do código
        if(!validar()) return

        try{

            //Realiza a solicitação do serviço de autenticação por CPF
            const response = await autenticarCpf(cpf)

             //Atualizando tela com loading
             setLoading(false);
        
            //Se a resposta voltar com status 200 OK, 
            //retira a informação de email da promessa
            //e seta o email no state
            if(response.ok){

                response.json().then((json) => {
                
                    const emailBanco = json.email;
                    setEmail(emailBanco)
                    
                    navigation.navigate(
                        'AutenticacaoCodigo',
                        {
                            emailRecebido: emailBanco
                        })
                })

            }else{
                console.log('não vai rolar, kirido')
            }

        }catch(erro){
            console.log('entrei no catch')
            console.log(erro)
        }
        
    }

    const validar = () =>{
        if(!cpf){
            Alert.alert('Por gentileza, digite um CPF válido')
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

    return (
        <View style={styles.container}>
           <Image
          style={styles.image_logo}
          source={require('../../assets/logo/logo_png_light.png')}
        />

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

        <FloatingLabelInput
            label="Digite seu CPF ^^"
            value={cpf ? cpf : ''}
            onChangeText={(texto) => setCpf(texto)}
            maxLength={11}
            keyboardType={'numeric'}
            editable={loading ? false : true}
        />

        <TouchableOpacity
         style={styles.button}
         onPress={autenticarCpfFunc}
         disabled={ loading ? true : false}
        >
         <Text style={styles.button_texto}> ENTRAR</Text>
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
        justifyContent: "space-around"
    },
    containerLoading: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },
    image_logo: {
        width: 200,
        height: 200,
        alignSelf: "center"
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
    }
})

export default TelaAutenticacao