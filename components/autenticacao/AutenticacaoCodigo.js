//Recursos do React/React Native
import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, ActivityIndicator } from 'react-native'

//Importando componente de fontes
import * as Font from 'expo-font'

//Importando AppLoading para load de recursos
import { AppLoading } from 'expo';

//Importando input com label flutuante
import FloatingLabelInput from '../tools/FloatingLabelInputWhite'

//Importando serviços
import { autenticarCodigo, verificarFinaisCelularesUsuario } from '../../services/auth-service'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//Fonte: https://www.npmjs.com/package/react-native-simple-toast
//Importando toast simples para avisos de validação

const TelaAutenticacaoCodigo = ({route, navigation}, props) =>{

    //Recebe o email do cliente 
    //fragmenta para exibir somente a inicial e o final, por segurança.
    const {emailRecebido, idUsuarioRecebido, cpfRecebido} =  route.params;

    //Interações com state
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [codigo, setCodigo] = useState('')
    const [loading, setLoading] = useState(false)

    //Código de autenticação de código recebido por email
    const autenticarCodigoFunc = async(e) => {

        //Atualizando tela com loading
        setLoading(true);

        //O retorno vazio encerra a thread do código
        if(!validar()) return

        try{
            
            //Verifica se o código digitado corresponde
            //ao código salvo no perfil que está tentando logar
            //Se retornar o usuário definir qual será o direcionamento de Home necessário
            const responseCodigo = await autenticarCodigo(codigo)

            //Atualizando tela sem loading
            setLoading(false);

            //Se a resposta voltar com status 200 OK, 
            //prossegue, senão dá mensagem
            if(responseCodigo.ok){
                
                responseCodigo.json().then((json) => {
                
                    const tipoPerfilBeneficiario = json.flgBeneficiario;
                    const tipoPerfilCompanheiro = json.flgCompanheiro;
                    
                    if(tipoPerfilBeneficiario == '1' && tipoPerfilCompanheiro == '1'){
                        navigation.navigate(
                            'AutenticacaoPerfil',
                            {
                                idUsuarioRecebido: idUsuarioRecebido
                            })  
                    }else{
                        if(tipoPerfilBeneficiario == '1'){
                            navigation.navigate(
                                'HomeBeneficiario',
                                {
                                    idUsuarioRecebido: idUsuarioRecebido,
                                    flgDoisPerfis: false
                                })
                        }else{
                            navigation.navigate(
                                'HomeCompanheiro',
                                {
                                    idUsuarioRecebido: idUsuarioRecebido,
                                    flgDoisPerfis: false
                                })
                        }
                    }
                })
            }else if(responseCodigo.status == 404){
                
                Alert.alert(
                "Erro de Autenticação :(",
                "Por gentileza, reveja seu código enviado ou, se não tiver acesso a esse email, cadastre um novo endereço.",
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

    const atualizarEmailAcessoFunc = () => {
        navigation.navigate(
            'AtualizarEmailAcesso',
            {
                idUsuarioRecebido: idUsuarioRecebido,
                cpfRecebido: cpfRecebido
            })
    }

    const atualizarEmailEsquecimentoFunc = async(e) => {

        try{
            
            //Verifica os finais de celulares existentes para as entidades
            //que tenham esse código de usuário
            const responseCodigo = await verificarFinaisCelularesUsuario(idUsuarioRecebido)

            console.log(codigo)

            //Atualizando tela sem loading
            setLoading(false);

            //Se a resposta voltar com status 200 OK, 
            //prossegue, senão dá mensagem
            if(responseCodigo.ok){
                
                responseCodigo.json().then((json) => {
                
                    const celularBeneficiario = json.celularBeneficiario;
                    const celularCompanheiro = json.celularCompanheiro;

                    navigation.navigate(
                        'AtualizarEmailEsquecimento',
                        {
                            idUsuarioRecebido: idUsuarioRecebido,
                            cpfRecebido: cpfRecebido,
                            celularBeneficiarioRecebido: celularBeneficiario,
                            celularCompanheiroRecebido: celularCompanheiro
                        })
                    
                })
            }else if(responseCodigo.status == 404){
                
                Alert.alert(
                "Erro de Obtenção de dados",
                "Ooops, erro nosso! Desculpe, estamos melhorando esse serviço. Por favor, notifique os desenvolvedores.",
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

    const validar = () =>{
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

    return (
        <KeyboardAwareScrollView
            //style={styles.container}
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
        >
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

         <Text style={styles.texto}>
            Enviamos um código para o seu email com final {emailRecebido} cadastrado.
            Confirme que você é o dono dele ^^
         </Text>
         
         <FloatingLabelInput
            label="Digite seu código ^^"
            value={codigo ? codigo : ''}
            onChangeText={(texto) => setCodigo(texto)}
            maxLength={5}
            keyboardType={'numeric'}
            editable={loading ? false : true}
        />

        <TouchableOpacity
         onPress={atualizarEmailAcessoFunc}
         disabled={loading ? true : false}
        >
            <Text style={styles.texto_pequeno}>Não tenho acesso ao meu email cadastrado</Text>
       </TouchableOpacity>

       <TouchableOpacity
         onPress={atualizarEmailEsquecimentoFunc}
         disabled={loading ? true : false}
        >
            <Text style={styles.texto_pequeno}>Esqueci meu email cadastrado</Text>
       </TouchableOpacity>

        <TouchableOpacity
         style={styles.button}
         onPress={autenticarCodigoFunc}
         disabled={loading ? true : false}
        >
         <Text style={styles.button_texto}> CONFIRMAR</Text>
       </TouchableOpacity>

       <TouchableOpacity
         style={styles.button_info}
        >
         <Image
            style={styles.image_info}
            source={require('../../assets/icons/ajuda_branco.png')}
         />
       </TouchableOpacity>

       </KeyboardAwareScrollView>
      );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#005E80",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between"
    },
    containerLoading: {
        position: "absolute",
        width: "100%",
        height: "100%",
        justifyContent: "center",
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
    texto_pequeno: {
        fontSize: 15,
        textAlign: 'right',
        marginRight: 30,
        color: "#D9CCCCCC"
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
        borderRadius: 60,
        justifyContent: "center"
    },
    image_info: {
        width: 50,
        resizeMode: "contain",
        alignSelf: "center"
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