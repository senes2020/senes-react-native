//Recursos
import 'react-native-gesture-handler'
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

//Componentes
import Autenticacao from './autenticacao/Autenticacao';
import Index from './Index'
import TelaAutenticacaoSms from './autenticacao/AutenticacaoSms';
import AutenticacaoPerfil from './autenticacao/AutenticacaoPerfil'
import CadastroIntro from './cadastro/CadastroIntro'
import TelaCadastroInformacoes from './cadastro/CadastroInformacoes';
import TelaCadastroDadosIdentificacao from './cadastro/CadastroDadosIdentificacao';
import TelaCadastroDadosContato from './cadastro/CadastroDadosContato';
import TelaCadastroConfirmacaoSms from './cadastro/CadastroConfirmacaoNumero';
import TelaCadastroConclusao from './cadastro/CadastroConclusao';

const Stack = createStackNavigator();

export default function MyStack(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
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
                    name="AutenticacaoSms"
                    component={TelaAutenticacaoSms}
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
                    name="CadastroConfirmacaoNumero"
                    component={TelaCadastroConfirmacaoSms}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="CadastroConclusao"
                    component={TelaCadastroConclusao}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}