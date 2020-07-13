//Recursos
import 'react-native-gesture-handler'
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

//Componentes
import SplashScreen from '../components/splash/SplashScreen';
import PaginaInicial from '../components/Index';
import TelaAutenticacao from '../components/autenticacao/Autenticacao';
import TelaAutenticacaoCodigo from '../components/autenticacao/AutenticacaoCodigo';
import TelaAutenticacaoPerfil from '../components/autenticacao/AutenticacaoPerfil';
import TelaCadastroIntro from '../components/cadastro/CadastroIntro';
import TelaCadastroInformacoes from '../components/cadastro/CadastroInformacoes';
import TelaCadastroDadosIdentificacao from '../components/cadastro/CadastroDadosIdentificacao';
import TelaCadastroDadosContato from '../components/cadastro/CadastroDadosContato';
import TelaCadastroConfirmacaoSms from '../components/cadastro/CadastroConfirmacaoEmail';
import TelaCadastroConclusao from '../components/cadastro/CadastroConclusao';
import TelaAtualizarEmailAcesso from '../components/autenticacao/AtualizarEmailAcesso';
import TelaAtualizarEmailEsquecimento from '../components/autenticacao/AtualizarEmailEsquecimento';
import TelaConfirmacaoCodigoNovoEmail from '../components/autenticacao/ConfirmacaoAtualizacaoEmail';

const Stack = createStackNavigator();

export default function SignedOutNavigator(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Splash"
                component={SplashScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Index"
                component={PaginaInicial}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Autenticacao"
                component={TelaAutenticacao}
                options={{title: 'Faça login já ^^'}}
            />
            <Stack.Screen
                name="AutenticacaoCodigo"
                component={TelaAutenticacaoCodigo}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="AutenticacaoPerfil"
                component={TelaAutenticacaoPerfil}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="CadastroIntro"
                component={TelaCadastroIntro}
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
                component={TelaCadastroConfirmacaoSms}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="CadastroConclusao"
                component={TelaCadastroConclusao}
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
    )
}
