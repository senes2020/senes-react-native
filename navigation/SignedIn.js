//Recursos
import 'react-native-gesture-handler'
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

//Componentes
import TelaAgendamento from '../components/agendamento/TelaAgendamento';
import DrawerNav from './DrawerNavigatorHome';

const Stack = createStackNavigator();

export default function SignedInNavigator(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="DrawerHome"
                component={DrawerNav}
                options={{headerShown: false}}
                
            />
            <Stack.Screen
                name="Agendamento"
                component={TelaAgendamento}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    )
}