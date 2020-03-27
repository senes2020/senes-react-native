//Recursos
import 'react-native-gesture-handler'
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

//Componentes
import Autenticacao from './Autenticacao';
import Index from './Index'
import TelaAutenticacaoSms from './AutenticacaoSms';
import AutenticacaoPerfil from './AutenticacaoPerfil'

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
            </Stack.Navigator>
        </NavigationContainer>
    )
}