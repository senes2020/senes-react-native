//Recursos
import 'react-native-gesture-handler'
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

//Componentes
import TelaAgendamento from '../components/agendamento/TelaAgendamento';
import DrawerNav from './DrawerNavigatorHome';
import Proposta from '../components/agendamento/Proposta';
import DateCal from '../components/agendamento/DateCal';
import ConfirmacaoAgendamento from '../components/agendamento/ConfirmacaoAgendamento';
import ConclusaoAgendamento from '../components/agendamento/ConclusaoAgendamento';

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
                name="Proposta"
                component={Proposta}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="DateCal"
                component={DateCal}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="ConfirmacaoAgendamento"
                component={ConfirmacaoAgendamento}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="ConclusaoAgendamento"
                component={ConclusaoAgendamento}
                options={{headerShown: false}}
            /> 
        </Stack.Navigator>
    )
}