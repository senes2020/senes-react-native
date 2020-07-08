//Recursos
import 'react-native-gesture-handler'
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

//Componentes
import TelaAgendamento from './agendamento/TelaAgendamento';

const Stack = createStackNavigator();

export default function NavigatorAutenticado(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Agendamento"
                    component={TelaAgendamento}
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

