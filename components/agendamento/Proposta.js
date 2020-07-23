import React, {useState, useEffect, Component}  from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import FloatingLabelInput from '../tools/FloatingLabelInputBlue';
import { coletarEndereco } from '../../services/data-service'
import { ScrollView } from 'react-native-gesture-handler';

const Proposta = ( {route, navigation}, props) => {

  //Coletando dados da navegação
  const {idProfissionalEscolhido, idBeneficiario, valorProfissional} = route.params

  //Interações com state
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [cep, setCep] = useState('')
  const [cidade, setCidade] = useState('')
  const [rua, setRua] = useState('')
  const [numero, setNumero] = useState('')
  const [complemento, setComplemento] = useState('')
  const [bairro, setBairro] = useState('')
  const [valorTotalPagamento, setValorTotalPagamento] = useState(0)
  const [loading, setLoading] = useState(false)
  const [dataAgendamento, setDataAgendamento] = useState('')
  const [horarioInicio, setHorarioInicio] = useState('')
  const [horarioFim, setHorarioFim] = useState('')
  const [cvc, setCvc] = useState('')
  const [expiry, setExpiry] = useState('')
  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  //Obtem o evento de quando a tela é desfocada e focada novamente
  navigation.addListener('focus', () => {

    //Se possuir os parâmetros de horário, faz os cálculos do valor final
    //de acordo com o valor/h do profissional escolhido
    if(route.params.horarioInicio && route.params.horarioFim){
      
      let horario_inicio = route.params.horarioInicio;
      let horario_final = route.params.horarioFim;

      let horaInicio = parseInt(horario_inicio.split(":"))
      let horaFinal = parseInt(horario_final.split(":"))

      let horas = horaFinal - horaInicio;

      let valor = horas * parseInt(valorProfissional);

      //Setando dados referentes a data, horário e valor total estimado
      setDataAgendamento(route.params.dataInicio)
      setHorarioInicio(horario_inicio)
      setHorarioFim(horario_final)
      setValorTotalPagamento(valor)
    }

    //Verifica se os dados do cartão foram passados
    if(route.params.dadosCartao){
      
      //Setando dados do cartão de crédito
      setCvc(route.params.dadosCartao.values.cvc)
      setExpiry(route.params.dadosCartao.values.expiry)
      setNumber(route.params.dadosCartao.values.number)
      setName(route.params.dadosCartao.values.name)

    }

  });

  //Função que realiza as validações de preenchimento
  const validar = () => {

    if(!route.params.dataInicio || !route.params.horarioInicio || !route.params.horarioFim){
      Alert.alert(
        "Falta de dados para o Agendamento",
        "Antes de prosseguir, por gentileza selecione uma data e os horários em que ocorrerá o acompanhamento.",
        [
            
            { text: "OK"}
        ],
        { cancelable: false }
      );

      return false 
    }else if(rua.length == 0 || cidade.length == 0 || numero.length == 0 || bairro.length == 0){

      Alert.alert(
        "Falta de dados para o Agendamento",
        "Acho que você esqueceu de preencher algum campo obrigatório de endereço. Por favor, preencha todos os campos antes de realizar o agendamento.",
        [
            
            { text: "OK"}
        ],
        { cancelable: false }
      );

      return false

    }else if(!route.params.metodoPagamento){

      Alert.alert(
        "Falta de dados para o Agendamento",
        "Por gentileza, escolha uma forma de pagamento antes de realizar o agendamento.",
        [
            
            { text: "OK"}
        ],
        { cancelable: false }
      );

      return false

    }

    return true

  }

  //Função que faz a confirmacao dos dados
  const confirmacao = () => {

    //O retorno vazio encerra a thread do código
    if(!validar()) return

    //Coleta o método de pagamento recebido
    let metodoRecebido = route.params.metodoPagamento

    //Monta objeto que representa os dados de agendamento que serão enviados para confirmação
    const dadosAgendamento = {
      data: dataAgendamento,
      horario_inicio: horarioInicio,
      horario_fim: horarioFim,
      cep: cep,
      rua: rua,
      bairro: bairro,
      cidade: cidade,
      numero: numero,
      complemento: complemento,
      companheiro: {
        id: idProfissionalEscolhido
      },
      beneficiario: {
        id: idBeneficiario
      },
      metodoPagamento: metodoRecebido,
      cartao: {
        cvc: cvc,
        name: name,
        number: number,
        expiry: expiry
      },
      valorTotal: valorTotalPagamento
    }

    //Envia para tela de confirmação com os dados
    navigation.navigate('ConfirmacaoAgendamento', {
      agendamento: dadosAgendamento
    })

  }

  //Função que chama tela de datas e horários
  const datecal = () => {
    navigation.navigate('DateCal');
  }

  //Função que busca dados de um local a partir do CEP enviado
  const coletarEnderecoPorCep = async(cep) => {

    try{
            
        const response = await coletarEndereco(cep)

        //Atualizando tela sem loading
        //setLoading(false);

        //Se a resposta voltar com status 200 OK, 
        //prossegue, senão dá mensagem
        if(response.ok){
            
            response.json().then((json) => {

              if(!json.erro){

                const cidadeRecebida = json.localidade
                setCidade(cidadeRecebida)

                const ruaRecebida = json.logradouro
                setRua(ruaRecebida)

                const bairroRecebido = json.bairro
                setBairro(bairroRecebido)

              }else{

                setCidade('')
                setRua('')
                setBairro('')

              }
            
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

  //Função que faz a atualização do CEP no state e dependendo do seu tamanho faz a busca dos campos
  const atualizarCep = (cep) => {

    //Setando o CEP no state
    setCep(cep)

    //Executando função com CEP novo se atingir o número de dígitios
    if(cep.length >= 8){
      coletarEnderecoPorCep(cep)
    }
    
  }

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

  const prosseguirComPagamento = (metodo) => {

    //Verifica o método escolhido e encaminha para a respectiva página
    if(metodo == 'dinheiro'){

      navigation.navigate('PagamentoDinheiro');

    }else if(metodo == 'cartao'){

      navigation.navigate('PagamentoCartaoCredito');

    }
  }

  //Iniciando visual
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container_card}>
        <Text style={styles.text_title}>QUASE LÁ</Text>
        <Text style={styles.text_card}> 
          Nos informe a data e horário de início e término do acompanhamento.
        </Text>
  
        <View style={styles.container_information}>

          <TouchableOpacity
          style={styles.button_date}
            onPress={datecal}>
            <Text style={styles.text_information}>
              Toque para selecionar data e horário
            </Text>
          </TouchableOpacity>

          <View style={styles.container_endereco}>
            <Text style={styles.text_endereco}>Informe o endereço para o acompanhamento.</Text>
            <FloatingLabelInput
                label="Digite o CEP"
                value={cep ? cep : ''}
                onChangeText={(texto) => atualizarCep(texto)}
                maxLength={8}
                keyboardType={'numeric'}
                editable={loading ? false : true}
            />
             
            <FloatingLabelInput
                label="Qual a cidade?"
                value={cidade ? cidade : ''}
                onChangeText={(texto) => setCidade(texto)}
                maxLength={40}
                editable={loading ? false : true}
            />
            <FloatingLabelInput
                label="Qual a rua?"
                value={rua ? rua : ''}
                onChangeText={(texto) => setRua(texto)}
                maxLength={40}
                editable={loading ? false : true}
            />
            <FloatingLabelInput
                label="Qual o bairro?"
                value={bairro ? bairro : ''}
                onChangeText={(texto) => setBairro(texto)}
                maxLength={40}
                editable={loading ? false : true}
            />
            <FloatingLabelInput
                label="Qual o número?"
                value={numero ? numero : ''}
                onChangeText={(texto) => setNumero(texto)}
                maxLength={40}
                editable={loading ? false : true}
            />
            <FloatingLabelInput
                label="Algum complemento?"
                value={complemento ? complemento : ''}
                onChangeText={(texto) => setComplemento(texto)}
                maxLength={40}
                keyboardType={'numeric'}
                editable={loading ? false : true}
            />
            
          </View>

          <View>
            <Text style={styles.text_pagamento}>
              Forma de Pagamento
            </Text>
            <View style={styles.pagamento_icons}>
              <TouchableOpacity
                //style={styles.button_date}
                onPress={() => prosseguirComPagamento('dinheiro')}
              >
                <Image
                  style={styles.image_money}
                  source={require('../../assets/images/dinheiro-icone.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity
                //style={styles.button_date}
                onPress={() => prosseguirComPagamento('cartao')}
              >
                <Image
                    style={styles.image_card}
                    source={require('../../assets/images/card.png')}
                />
              </TouchableOpacity>
            </View>
          </View>

        </View>
        
        <View>
          <Text style={styles.text_valor}>
            Valor Total: R$ {valorTotalPagamento}
          </Text>
        </View>

      </View>

      <View>
        <TouchableOpacity
          style={styles.button_agendar}
          onPress={confirmacao}
          >
          <Text style={styles.text_agendar}>AGENDAR</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

//Estilização
const styles = StyleSheet.create({
  container: {
    //flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textTitle: {
    fontSize: 27,
    fontFamily: 'montserrat-regular-texto',
    paddingBottom: 20,
  },

  text_title: {
    fontSize: 21,
    paddingBottom: 40,
    fontFamily: 'montserrat-negrito',
    textAlign: 'center',
    paddingTop: 40,
    color: '#005E80',
  },

  text_card: {
    fontSize: 18,
    fontFamily: 'montserrat-titulo',
    textAlign: 'center',
    minHeight: 60, 
  },

  text_information: {
    fontSize: 20,
    fontFamily: 'montserrat-negrito',
    textAlign: 'center',
    color: '#005E80',
    letterSpacing: 1,
  },

  text_fim: {
    fontSize: 20,
    fontFamily: 'montserrat-regular-texto',
    textAlign: 'center',
    color: '#005E80',
    letterSpacing: 1,
    marginBottom: 30,
    paddingTop: 10,
  },

  text_pagamento: {
    fontSize: 20,
    fontFamily: 'montserrat-regular-texto',
    textAlign: 'center',
    color: '#005E80',
    letterSpacing: 1,
    marginTop: 40,
  },

  text_valor: {
    fontSize: 20,
    fontFamily: 'montserrat-negrito',
    marginLeft: 80,
    color: '#005E80',
    letterSpacing: 1,
    margin: 30,
  },

  text_agendar: {
    fontSize: 18,
    fontFamily: 'montserrat-regular-texto',
    textAlign: "center",
    color: '#005E80',
    letterSpacing: 1,
    marginTop: 10,
  },

  container_card: {
    backgroundColor: "#fff",
    //backgroundColor: "red",
    minHeight: 510,
    width: 380,
    borderWidth: 1,
    borderColor: '#005E80',
    marginTop: 30,
  },

  container_information: {
    minHeight: 350,
    width: 300,
    alignSelf: 'center',
  },

  container_endereco: {
    width: 300,
    alignSelf: 'center',
  },

  container_btn: {
    width: 300,
    top: 20,
    borderRadius: 80,
  },

  image: {
    width: 20,
    height: 20,
    marginLeft: 190,
    marginVertical: -20,
  },

  image_money: {
    width: 65,
    height: 65
  },

  image_card: {
    width: 95,
    height: 95,
    //marginVertical: -80,
  },

  pagamento_icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 50,
    marginRight: 50
  },

  image_fim: {
    width: 35,
    height: 35,
    marginLeft: 180,
  },

  datepicker: {
    marginTop: 30,
    marginBottom: 10,
  },

  datepicker_fim: {
    width: 280,
    alignSelf: "center",
    paddingTop: 10,
  },

  button_date: {
    width: 300,
    height: 50,
    borderRadius: 20,
    marginTop: 20,
    textAlign: "center",
  },

  button_agendar: {
    width: 250,
    height: 50,
    borderColor: '#005E80',
    backgroundColor: '#fff',
    borderWidth: 1.5,
    borderRadius: 15,
    marginTop: 25,
    textAlign: "center",
  }

});

export default Proposta;