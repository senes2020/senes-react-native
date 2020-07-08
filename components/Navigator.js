//Recursos
import 'react-native-gesture-handler'
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

//Componentes
import Autenticacao from './autenticacao/Autenticacao';
import Index from './Index'
import TelaAutenticacaoCodigo from './autenticacao/AutenticacaoCodigo';
import AutenticacaoPerfil from './autenticacao/AutenticacaoPerfil'
import CadastroIntro from './cadastro/CadastroIntro'
import TelaCadastroInformacoes from './cadastro/CadastroInformacoes';
import TelaCadastroDadosIdentificacao from './cadastro/CadastroDadosIdentificacao';
import TelaCadastroDadosContato from './cadastro/CadastroDadosContato';
import TelaCadastroConfirmacaoEmail from './cadastro/CadastroConfirmacaoEmail';
import TelaCadastroConclusao from './cadastro/CadastroConclusao';
import TelaHomeBeneficiario from './home/HomeBeneficiario';
import TelaHomeCompanheiro from './home/HomeCompanheiro';
import TelaAtualizarEmailAcesso from './autenticacao/AtualizarEmailAcesso';
import TelaConfirmacaoCodigoNovoEmail from './autenticacao/ConfirmacaoAtualizacaoEmail';
import TelaAtualizarEmailEsquecimento from './autenticacao/AtualizarEmailEsquecimento';
import SplashScreen from './splash/SplashScreen';

const Stack = createStackNavigator();

//const initialAction = { type: NavigationActions.Init }
//const initialState = Stack.router.getStateForAction(initialAction)

export default function MyStack(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Index"
                    component={Index}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Autenticacao"
                    component={Autenticacao}
                    options={{title: 'Faça login já ^^'}}
                />
                <Stack.Screen
                    name="AutenticacaoCodigo"
                    component={TelaAutenticacaoCodigo}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="AutenticacaoPerfil"
                    component={AutenticacaoPerfil}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="CadastroIntro"
                    component={CadastroIntro}
                    options={{title: ''}}
                />
                <Stack.Screen
                    name="CadastroInformacoes"
                    component={TelaCadastroInformacoes}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="CadastroDadosIdentificacao"
                    component={TelaCadastroDadosIdentificacao}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="CadastroDadosContato"
                    component={TelaCadastroDadosContato}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="CadastroConfirmacaoEmail"
                    component={TelaCadastroConfirmacaoEmail}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="CadastroConclusao"
                    component={TelaCadastroConclusao}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="HomeBeneficiario"
                    component={TelaHomeBeneficiario}
                    options={{headerShown: false}}
                    
                />
                <Stack.Screen
                    name="HomeCompanheiro"
                    component={TelaHomeCompanheiro}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="AtualizarEmailAcesso"
                    component={TelaAtualizarEmailAcesso}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="AtualizarEmailEsquecimento"
                    component={TelaAtualizarEmailEsquecimento}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="ConfirmacaoAtualizacaoEmail"
                    component={TelaConfirmacaoCodigoNovoEmail}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

/*
export default (state = initialState, action) => {
    // Our Navigator's router is now responsible for 
    // creating our navigation state object
    return Navigator.router.getStateForAction(action, state)
  }*/